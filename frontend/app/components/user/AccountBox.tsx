/**
 * AccountBox
 *
 * A component that contains various
 * settings for the user to change
 * on their account settings page
 */

import { useState } from "react";

const AccountBox = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const renderSettings = () => {
    switch (activeTab) {
      case "login":
        return <LoginSettings />;
      case "gameplay":
        return <GameplaySettingsMenu />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col rounded-lg w-full min-h-[80vh]">
      <div className="flex flex-row justify-center p-2 gap-5 mb-5 w-full border-1 border-[#e1e1e1] rounded-xl text-[#4b5563]">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={
            activeTab === "login"
              ? "pl-5 pr-5 border-l-1 border-l-[#e1e1e1] border-r-1 border-r-[#e1e1e1] cursor-pointer hover:text-neutral-400 ease-linear duration-75 font-semibold"
              : "pl-5 pr-5 border-l-1 border-l-[#e1e1e1] border-r-1 border-r-[#e1e1e1] cursor-pointer hover:text-neutral-400 ease-linear duration-75"
          }
        >
          Login Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gameplay")}
          className={
            activeTab === "gameplay"
              ? "pr-5 border-r-1 border-r-[#e1e1e1] cursor-pointer hover:text-neutral-400 ease-linear duration-75 font-semibold"
              : "pr-5 border-r-1 border-r-[#e1e1e1] cursor-pointer hover:text-neutral-400 ease-linear duration-75"
          }
        >
          Gameplay Settings
        </button>
      </div>
      {renderSettings()}
    </div>
  );
};

// Login Settings Submenu
const LoginSettings = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>("email");

  const renderSubSettings = () => {
    switch (activeSubTab) {
      case "email":
        return <h1>Change Email</h1>;
      case "username":
        return <h1>Change Username</h1>;
      case "password":
        return <h1>Change Password</h1>;
      case "delete":
        return <h1>Delete Account</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row gap-5">
      <LoginSettingsMenu
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />
      {renderSubSettings()}
    </div>
  );
};

// Login Settings Menu
const LoginSettingsMenu = ({
  activeSubTab,
  setActiveSubTab,
}: {
  activeSubTab: string;
  setActiveSubTab: Function;
}) => {
  return (
    <div className="flex flex-col p-3 border-1 border-[#e1e1e1] rounded-lg w-fit min-h-[60vh]">
      <button
        onClick={() => setActiveSubTab("email")}
        className={
          activeSubTab === "email"
            ? "text-sm border-b-1 border-b-[#e1e1e1] pb-2 cursor-pointer font-semibold hover:text-neutral-400 ease-linear duration-75"
            : "text-sm border-b-1 border-b-[#e1e1e1] pb-2 cursor-pointer hover:text-neutral-400 ease-linear duration-75"
        }
      >
        Change Email
      </button>

      <button
        onClick={() => setActiveSubTab("username")}
        className={
          activeSubTab === "username"
            ? "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer font-semibold hover:text-neutral-400 ease-linear duration-75"
            : "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer hover:text-neutral-400 ease-linear duration-75"
        }
      >
        Change Username
      </button>

      <button
        onClick={() => setActiveSubTab("password")}
        className={
          activeSubTab === "password"
            ? "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer font-semibold hover:text-neutral-400 ease-linear duration-75"
            : "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer hover:text-neutral-400 ease-linear duration-75"
        }
      >
        Change Password
      </button>

      <button
        onClick={() => setActiveSubTab("delete")}
        className={
          activeSubTab === "delete"
            ? "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer font-semibold hover:text-neutral-400 ease-linear duration-75"
            : "text-sm border-b-1 border-b-[#e1e1e1] pb-2 pt-2 cursor-pointer hover:text-neutral-400 ease-linear duration-75"
        }
      >
        Delete Account
      </button>
    </div>
  );
};

// Gameplay Settings Sub-menu
const GameplaySettingsMenu = () => {
  return (
    <div className="flex flex-col p-3 border-1 border-[#e1e1e1] rounded-lg w-fit min-h-[60vh]">
      <button className="text-sm border-b-1 border-b-[#e1e1e1] pb-2 cursor-pointer hover:text-neutral-400 ease-linear duration-75">
        Change Wall Colors
      </button>
    </div>
  );
};

export default AccountBox;
