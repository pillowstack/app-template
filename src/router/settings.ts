import SettingsOverview from "@/views/Settings/SettingsOverview.vue";

export default {
  path: "/settings",
  name: "settings",
  component: SettingsOverview,
  meta: {
    requiresAuth: false,
    title: "Settings",
  },
  children: [
    {
      path: "language",
      name: "languageSettings",
      component: () =>
        import(/* webpackChunkName: "languageSettings" */ "../views/Settings/LanguageSettings.vue"),
      meta: {
        requiresAuth: false,
        title: "Language Settings",
      },
    },
    {
      path: "theme",
      name: "themeSettings",
      component: () =>
        import(/* webpackChunkName: "themeSettings" */ "../views/Settings/ThemeSettings.vue"),
      meta: {
        requiresAuth: false,
        title: "Theme Settings",
      },
    },
  ],
};
