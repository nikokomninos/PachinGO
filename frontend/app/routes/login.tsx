/**
 * login.tsx - the login page route
 */

import LoginBox from "~/components/auth/LoginBox";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - PachinGO!" },
    { name: "description", content: "Log into PachinGO!" },
  ];
}

const login = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex justify-center items-center">
      <LoginBox />
    </div>
  );
};

export default login;
