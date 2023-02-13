export default [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/main/index.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/profile/index.vue"),
        // 标记当前页面只有用户登录后才可以进入
        meta: { user: true }
      }
    ]
  },
  {
    path: "/pins/:id",
    name: "pins",
    component: () => import("@/views/pins/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login-register/login/index.vue")
  }
];
