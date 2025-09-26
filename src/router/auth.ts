import AppleLoginComplete from "@/views/Auth/AppleLoginComplete.vue";

export default {
  path: "/auth/apple-login-complete",
  name: "AppleLoginComplete",
  component: AppleLoginComplete,
  meta: {
    requiresAuth: false,
    title: "Apple Login Complete",
  },
};
