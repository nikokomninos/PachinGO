"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  IoIosExit,
  IoIosLogIn,
  IoMdContact,
  IoMdSettings,
} from "react-icons/io";
import { authClient } from "@/lib/auth-client";
import ThemeMenu from "./ThemeMenu";

// A menu above the Navbar that contains anything related
// to user authentication and profile navigation, as well
// as changing the site theme
export default function AuthMenu() {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await authClient.signOut(
      {},
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          router.push("/");
        },
      },
    );
  };

  if (isPending) return <div className="h-6"></div>;

  return (
    <div className="w-full flex justify-end md:mr-[3vw] tracking-tight">
      {session ? (
        <motion.div
          initial={{ scale: 1, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1, opacity: 0, y: -10 }}
          transition={{
            ease: "backOut",
            duration: 0.15,
          }}
          className="flex flex-row items-center gap-2"
        >
          <ThemeMenu />
          <UserMenu username={session.user.name} handleLogout={handleLogout} />
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 1, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1, opacity: 0, y: -10 }}
            transition={{
              ease: "backOut",
              duration: 0.15,
            }}
            className="flex flex-row items-center gap-2"
          >
            <ThemeMenu />
            <LoginButton />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// The button shown when a user is not logged in
// Brings them to the login screen
function LoginButton() {
  return (
    <AnimatePresence>
      <a
        href="/auth/login"
        className="w-6 h-6 p-1 flex justify-center items-center border border-(--border) bg-(--background) hover:bg-(--background-alt) hover:text-(--foreground-alt) rounded-sm ease-linear duration-75 cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.05,
          }}
          className="flex items-center justify-center"
        >
          <IoIosLogIn size={13} />
        </motion.div>
      </a>
    </AnimatePresence>
  );
}

// The button / popup menu shown when a user
// is logged in
function UserMenu({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => Promise<void>;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 1, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1, opacity: 0, y: -10 }}
        transition={{
          ease: "backOut",
          duration: 0.15,
        }}
        className="relative inline-block"
      >
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className={
            showMenu
              ? "w-6 h-6 p-1 flex justify-center items-center border border-(--border-alt) bg-(--background-alt) text-(--foreground-alt) rounded-sm ease-linear duration-75 cursor-pointer"
              : "w-6 h-6 p-1 flex justify-center items-center border border-(--border) bg-(--background) hover:bg-(--background-alt) hover:text-(--foreground-alt) rounded-sm ease-linear duration-75 cursor-pointer"
          }
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.05,
            }}
            className="flex items-center justify-center"
          >
            <CgProfile size={13} />
          </motion.div>
        </button>
        {showMenu && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 1, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1, opacity: 0, y: -10 }}
              transition={{
                ease: "backOut",
                duration: 0.15,
              }}
              className="absolute left-1/2 -translate-x-1/2 mt-4 border border-(--border) w-25 rounded-sm p-2 z-10 bg-(--background)"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-(--border) bg-(--background)" />
              <a href={`/user/${username}`}>
                <div className="flex flex-row justify-between items-center mb-2 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer">
                  <p className="text-xs">Profile</p>
                  <IoMdContact />
                </div>
              </a>

              {/*
              <a href={`/account`}>
                <div className="flex flex-row justify-between items-center mb-2 hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer">
                  <p className="text-xs">Account</p>
                  <IoMdSettings />
                </div>
              </a>
              */}

              <button
                type="button"
                onClick={() => handleLogout()}
                className="flex flex-row w-full justify-between items-center hover:text-(--foreground-alt) ease-linear duration-75 cursor-pointer"
              >
                <p className="text-xs">Logout</p>
                <IoIosExit />
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
