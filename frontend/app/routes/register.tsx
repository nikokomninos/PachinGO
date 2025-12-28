/**
 * register.tsx - the registration page route
 */

import RegisterBox from "~/components/auth/RegisterBox";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - PachinGO!" },
    { name: "description", content: "Register for PachinGO!" },
  ];
}

const register = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex justify-center items-center">
      <RegisterBox />
    </div>
  );
};

export default register;
