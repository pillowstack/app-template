import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppNavStore = defineStore("appNav", () => {
  const visible = ref(true);
  const showAppNav = computed(() => visible.value);

  function show() {
    visible.value = true;
  }
  function hide() {
    visible.value = false;
  }
  function toggle() {
    visible.value = !visible.value;
  }

  return { showAppNav, show, hide, toggle };
});
