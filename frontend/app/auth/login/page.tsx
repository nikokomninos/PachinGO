import type { Metadata } from "next";
import LoginBox from "@/components/auth/LoginBox";

export const metadata: Metadata = {
  title: "Login - PachinGO!",
  description: "Ready to become a PachinGOD?",
};

export default async function Login() {
  return <LoginBox />;
}
