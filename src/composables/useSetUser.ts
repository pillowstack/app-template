import { useBioStore } from "@/stores/profile/bio";
import { useLanguageStore } from "@/stores/settings/language";
import { useNameStore } from "@/stores/profile/name";
import { useThemeStore } from "@/stores/settings/theme.ts";
import type { Bio, Language, Name, Theme } from "@pillowstack/shared-template";

export function useSetUser() {
  const setUser = async (user: {
    profile?: { bio?: Bio; name?: Name };
    settings?: { language?: Language; theme?: Theme };
  }) => {
    if (!user) {
      console.error("[useSetUser] No user data provided");
      return;
    }

    if (user.profile?.bio) {
      const { setProfileBio } = useBioStore();
      await setProfileBio(user.profile.bio);
    }

    if (user.profile?.name) {
      const { setProfileName } = useNameStore();
      await setProfileName(user.profile.name);
    }

    if (user.settings?.language) {
      const { setLanguage } = useLanguageStore();
      await setLanguage(user.settings.language);
    }

    if (user.settings?.theme) {
      const { setTheme } = useThemeStore();
      await setTheme(user.settings.theme);
    }
  };

  return {
    setUser,
  };
}
