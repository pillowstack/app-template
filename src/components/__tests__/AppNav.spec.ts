import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/i18n";
import TheAppNav from "../TheAppNav.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div />" } },
    { path: "/about", component: { template: "<div />" } },
    { path: "/settings", component: { template: "<div />" } },
  ],
});

describe("TheAppNav", () => {
  it("renders properly", async () => {
    const pinia = createPinia();
    const wrapper = mount(TheAppNav, {
      global: {
        plugins: [pinia, router, i18n],
      },
    });
    await router.isReady();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("nav").exists()).toBe(true);
  });
});
