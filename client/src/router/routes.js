const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/RegisterForm"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/LoginForm"),
  },
];

export default routes;
