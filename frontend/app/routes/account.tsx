import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "~/components/nav/Footer";
import Navbar from "~/components/nav/Navbar";
import AccountBox from "~/components/user/AccountBox";
import UserBox from "~/components/user/UserBox";
import { useAuthStore } from "~/stores/useAuthStore";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account Settings - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const account = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) setIsLoading(false);
    else navigate("/login");
  }, [user]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex flex-row justify-start items-start ml-[3vw] mr-[3vw] gap-10">
            <UserBox username={(user as any).username} />
            <AccountBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default account;
