import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

type FlatMap = Record<string, string>;

const SRC_DIR = path.resolve(process.cwd(), "src");
const LANG_DIR = path.join(SRC_DIR, "languages");
const SUPPORTED_EXTS = [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte", ".html", ".astro"];

function hasBom(content: string): boolean {
  return content.charCodeAt(0) === 0xfeff;
}

function stripBom(content: string): string {
  return hasBom(content) ? content.slice(1) : content;
}

function readTextFileSafe(filePath: string): string {
  const raw = fs.readFileSync(filePath, "utf8");
  return stripBom(raw);
}

function walkFiles(dir: string, filterExts: string[], out: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, filterExts, out);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (filterExts.includes(ext)) {
        out.push(full);
      }
    }
  }
  return out;
}

function normalizeKey(raw: string): string {
  // Trim and collapse internal whitespace
  return raw.replace(/\s+/g, " ").trim();
}

function unescapeStringLiteral(s: string, quote: "'" | '"'): string {
  // Handle simple escapes for corresponding quote and backslash, as well as \n, \r, \t
  // We avoid full JSON parsing to keep behavior aligned with JS string literals.
  return s
    .replace(new RegExp(`\\\\${quote}`, "g"), quote)
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\\\/g, "\\");
}

function collectI18nKeys(srcRoot: string): string[] {
  const files = walkFiles(srcRoot, SUPPORTED_EXTS);
  const keys = new Set<string>();

  // Regexes for t('...') and t("...") as first argument. Ignore template literals and variables.
  const singleRe = /\bt\(\s*'((?:\\'|[^'])*)'/g;
  const doubleRe = /\bt\(\s*"((?:\\"|[^"])*)"/g;

  for (const file of files) {
    try {
      const content = readTextFileSafe(file);
      let m: RegExpExecArray | null;

      singleRe.lastIndex = 0;
      while ((m = singleRe.exec(content)) !== null) {
        const lit = unescapeStringLiteral(m[1], "'");
        const norm = normalizeKey(lit);
        if (norm) keys.add(norm);
      }

      doubleRe.lastIndex = 0;
      while ((m = doubleRe.exec(content)) !== null) {
        const lit = unescapeStringLiteral(m[1], '"');
        const norm = normalizeKey(lit);
        if (norm) keys.add(norm);
      }
    } catch {
      // Ignore unreadable files
    }
  }

  return Array.from(keys).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function ensureLanguagesDir(): string[] {
  if (!fs.existsSync(LANG_DIR) || !fs.statSync(LANG_DIR).isDirectory()) {
    throw new Error(`Missing src/languages directory at ${LANG_DIR}. Aborting i18n sync.`);
  }
  const files = fs
    .readdirSync(LANG_DIR)
    .filter((f) => /\.(json|ts)$/.test(f))
    .sort();
  if (files.length === 0) {
    throw new Error(
      `No language files found in ${LANG_DIR}. Expected 3 files (e.g., en.ts, es.ts, sr.ts).`,
    );
  }
  return files;
}

function extractExportDefaultObjectLiteral(tsSource: string): string | null {
  const idx = tsSource.indexOf("export default");
  if (idx === -1) return null;
  const after = tsSource.slice(idx + "export default".length);
  // Find first '{' after export default
  const braceStart = after.indexOf("{");
  if (braceStart === -1) return null;
  let i = braceStart + 1;
  let depth = 1;
  let inStr: null | '"' | "'" = null;
  let prev = "";
  for (; i < after.length; i++) {
    const ch = after[i];
    if (inStr) {
      if (ch === inStr && prev !== "\\") inStr = null;
    } else {
      if (ch === '"' || ch === "'") inStr = ch as '"' | "'";
      else if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          // slice from first '{' to this '}' inclusive
          return after.slice(braceStart, i + 1);
        }
      }
    }
    prev = ch;
  }
  return null;
}

function parseLanguageFile(filePath: string): FlatMap {
  const content = readTextFileSafe(filePath);
  const ext = path.extname(filePath);
  let obj: unknown;
  if (ext === ".json") {
    obj = JSON.parse(content);
  } else {
    const lit = extractExportDefaultObjectLiteral(content);
    if (!lit) {
      throw new Error(`Unable to parse language file: ${filePath}`);
    }
    // Evaluate the object literal in a sandboxed context.
    obj = vm.runInNewContext("(" + lit + ")", {}, { timeout: 1000 });
  }
  return flattenObject(obj as Record<string, unknown>);
}

function flattenObject(obj: Record<string, unknown>, prefix = ""): FlatMap {
  const out: FlatMap = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    const full = prefix ? `${prefix}.${key}` : key;
    if (value != null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenObject(value as Record<string, unknown>, full));
    } else if (typeof value === "string") {
      out[full] = value;
    }
  }
  return out;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

function unflattenObject(map: FlatMap): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  const entries = Object.entries(map).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  for (const [dotKey, value] of entries) {
    const parts = dotKey.split(".");
    let cur = root as Record<string, unknown>;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        (cur as Record<string, unknown>)[part] = value;
      } else {
        const next = (cur as Record<string, unknown>)[part];
        if (!isRecord(next)) {
          (cur as Record<string, unknown>)[part] = {} as Record<string, unknown>;
        }
        cur = (cur as Record<string, unknown>)[part] as Record<string, unknown>;
      }
    }
  }
  return root;
}

function serializeObjectToTs(obj: Record<string, unknown>, indent = 2): string {
  // Deterministic, sorted serialization with string keys quoted
  const spacer = " ".repeat(indent);
  function serialize(v: unknown, level: number): string {
    if (v == null) return "null";
    if (typeof v === "string") {
      return JSON.stringify(v);
    }
    if (typeof v !== "object") return JSON.stringify(v);
    const objV = v as Record<string, unknown>;
    const keys = Object.keys(objV).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    if (keys.length === 0) return "{}";
    const pad = spacer.repeat(level);
    const padIn = spacer.repeat(level + 1);
    const lines = keys.map((k) => `${padIn}${JSON.stringify(k)}: ${serialize(objV[k], level + 1)}`);
    return `{$\n${lines.join(",\n")}\n${pad}}`;
  }
  // export default { ... } with final newline
  const body = serialize(obj, 0).replace("{$", "{");
  return `export default ${body};\n`;
}

function writeFileAtomic(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  const tmp = path.join(
    dir,
    `.tmp-i18n-${path.basename(filePath)}-${process.pid}-${Math.random().toString(36).slice(2)}`,
  );
  fs.writeFileSync(tmp, content, { encoding: "utf8" });
  fs.renameSync(tmp, filePath);
}

function pickBaseLanguage(files: string[]): string {
  const en = files.find((f) => /^en\b/i.test(f));
  return en ?? files[0];
}

function main() {
  const apply = process.argv.includes("--apply");

  const langFiles = ensureLanguagesDir();
  const baseLangFile = pickBaseLanguage(langFiles);

  const collectedKeys = collectI18nKeys(SRC_DIR);

  const langMaps: Record<string, FlatMap> = {};
  for (const file of langFiles) {
    const fp = path.join(LANG_DIR, file);
    langMaps[file] = parseLanguageFile(fp);
  }

  // Compute removals: keys present in any lang but not in collected
  const allExistingKeys = new Set<string>();
  for (const m of Object.values(langMaps)) {
    for (const k of Object.keys(m)) allExistingKeys.add(k);
  }
  const toRemove = Array.from(allExistingKeys).filter((k) => !collectedKeys.includes(k));

  // Apply removals in a copy
  const updatedMaps: Record<string, FlatMap> = {};
  for (const [file, map] of Object.entries(langMaps)) {
    const copy: FlatMap = {};
    for (const k of Object.keys(map)) {
      if (!toRemove.includes(k)) copy[k] = map[k];
    }
    updatedMaps[file] = copy;
  }

  // Apply additions
  const baseName = baseLangFile;
  const additionsByLang: Record<string, string[]> = {};
  for (const file of langFiles) additionsByLang[file] = [];

  for (const key of collectedKeys) {
    for (const file of langFiles) {
      const map = updatedMaps[file];
      if (!(key in map)) {
        if (file === baseName) {
          map[key] = key; // identity default
        } else {
          map[key] = ""; // placeholder for translators
        }
        additionsByLang[file].push(key);
      }
    }
  }

  // Stats for dry-run
  const report: Record<
    string,
    {
      added: number;
      removed: number;
      kept: number;
      sampleAdded: string[];
      sampleRemoved: string[];
      sampleKept: string[];
    }
  > = {};
  for (const file of langFiles) {
    const before = Object.keys(langMaps[file]).sort();
    const after = Object.keys(updatedMaps[file]).sort();
    const added = after.filter((k) => !before.includes(k));
    const removed = before.filter((k) => !after.includes(k));
    const kept = after.filter((k) => before.includes(k));
    report[file] = {
      added: added.length,
      removed: removed.length,
      kept: kept.length,
      sampleAdded: added.slice(0, 5),
      sampleRemoved: removed.slice(0, 5),
      sampleKept: kept.slice(0, 5),
    };
  }

  // Print dry-run report
  console.log("i18n sync dry-run");
  console.log(`- Collected keys: ${collectedKeys.length}`);
  console.log(`- Languages: ${langFiles.join(", ")}`);
  console.log(`- Base language: ${baseLangFile}`);
  for (const file of langFiles) {
    const r = report[file];
    console.log(`\n${file}: added=${r.added}, removed=${r.removed}, kept=${r.kept}`);
    if (r.sampleAdded.length) console.log(`  + ${r.sampleAdded.join(", ")}`);
    if (r.sampleRemoved.length) console.log(`  - ${r.sampleRemoved.join(", ")}`);
    if (r.sampleKept.length) console.log(`  = ${r.sampleKept.join(", ")}`);
  }

  if (!apply) {
    console.log("\nRun with --apply to write changes.");
    return;
  }

  // Write updated language files with stable sort and nesting
  for (const file of langFiles) {
    const map = updatedMaps[file];
    const nested = unflattenObject(map);
    const content = serializeObjectToTs(nested, 2);
    const targetPath = path.join(LANG_DIR, file);
    writeFileAtomic(targetPath, content);
  }

  console.log("\nApplied i18n sync changes to language files.");
}

try {
  main();
} catch (err) {
  console.error("i18n sync failed:", (err as Error).message);
  process.exit(1);
}
