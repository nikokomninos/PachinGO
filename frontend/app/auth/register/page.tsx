import type { Metadata } from "next";
import RegisterBox from "@/components/auth/RegisterBox";

export const metadata: Metadata = {
  title: "Register - PachinGO!",
  description: "Ready to become a PachinGOD?",
};

export default function Login() {
  return <RegisterBox />;
}
