import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("users/:username", "routes/user.tsx"),
  route("account", "routes/account.tsx"),

  route("demo", "routes/demo.tsx"),
  route("play/:id", "routes/play.tsx"),
  route("search", "routes/search.tsx"),
  route("editor", "routes/editor.tsx"),
  route("about", "routes/about.tsx"),

  route("error", "routes/error.tsx")
] satisfies RouteConfig;
