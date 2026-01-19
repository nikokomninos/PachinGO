import type { Metadata } from "next";
import RegisterBox from "@/components/auth/RegisterBox";

export const metadata: Metadata = {
  title: "Register - PachinGO!",
  description: "Peggle Reborn",
};

export default function Login() {
  return <RegisterBox />;
}
