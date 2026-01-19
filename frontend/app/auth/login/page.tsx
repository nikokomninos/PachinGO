import type { Metadata } from "next";
import LoginBox from "@/components/auth/LoginBox";

export const metadata: Metadata = {
  title: "Login - PachinGO!",
  description: "Peggle Reborn",
};

export default async function Login() {
  return <LoginBox />;
}
