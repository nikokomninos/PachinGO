/**
 * NavLoginOnly
 *
 * A component that provides a sub-navbar,
 * containing links only for login.
 * Goes on top of the Navbar.
 */

import { useEffect, useState } from "react";
import { FaCaretDown, FaMoon, FaSun } from "react-icons/fa";
import { IoIosExit, IoMdContact } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

const NavLoginOnly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  // Handles logging the user out when the logout button is clicked
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Handles client side flicker. Will not render
  // login controls until login state is checked.
  useEffect(() => {
    //if (user) setRole((user as any).username);
    setIsLoading(false);
  }, [user]);

  if (isLoading) return null;

  return (
    <div className="w-full flex justify-end mr-[3vw] tracking-tight">
      {user ? (
        <div className="flex flex-row items-center gap-2">
          <ThemeMenu />
          <UserMenu user={user} handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <ThemeMenu />
          <Link
            to="/login"
            className="font-light text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-light text-xs hover:text-[var(--color-text-alt)] ease-linear duration-75"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

const ThemeMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleThemeChange = (theme: string) => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("theme-changed"));
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className="p-1 border-1 border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-alt)] rounded-sm ease-linear duration-75 cursor-pointer"
      >
        {localStorage.getItem("theme") === "light" ? (
          <FaSun size={11} />
        ) : (
          <FaMoon size={11} />
        )}
      </button>
      {showMenu && (
        <div className="absolute -translate-x-1/2 left-1/2 mt-1 border-1 border-[var(--color-border)] w-20 rounded-sm p-2 z-10 bg-[var(--color-bg)]">
          <button
            type="button"
            onClick={() => {
              handleThemeChange("light");
              setShowMenu(false);
            }}
            className="flex flex-row justify-between items-center mb-2 hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer w-full"
          >
            <p className="text-xs">Light</p>
            <FaSun size={12} />
          </button>

          <button
            type="button"
            onClick={() => {
              handleThemeChange("dark");
              setShowMenu(false);
            }}
            className="flex flex-row justify-between items-center hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer w-full"
          >
            <p className="text-xs">Dark</p>
            <FaMoon size={11} />
          </button>

          {/*<button className="flex flex-row justify-between items-center hover:text-neutral-400 ease-linear duration-75 cursor-pointer w-full">
            <p className="text-xs">System</p>
            <MdMonitor size={13} />
          </button>*/}
        </div>
      )}
    </div>
  );
};

const UserMenu = ({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: Function;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        className="flex flex-row items-center gap-1 font-semibold text-xs cursor-pointer hover:text-[var(--color-text-alt)] ease-linear duration-75"
      >
        Hello, {user?.username}!
        <FaCaretDown />
      </button>
      {showMenu && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 border-1 border-[var(--color-border)] w-50 rounded-sm p-2 z-10 bg-[var(--color-bg)]">
          <Link to={`/users/${user.username}`}>
            <div className="flex flex-row justify-between items-center mb-2 hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer">
              <p className="text-xs">My Profile</p>
              <IoMdContact />
            </div>
          </Link>

          {/*<Link to={`/account`}>
            <div className="flex flex-row justify-between items-center mb-2 hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer">
              <p className="text-xs">My Account Settings</p>
              <IoMdSettings />
            </div>
          </Link>
          */}

          <div
            onClick={() => handleLogout()}
            className="flex flex-row justify-between items-center hover:text-[var(--color-text-alt)] ease-linear duration-75 cursor-pointer"
          >
            <p className="text-xs">Logout</p>
            <IoIosExit />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLoginOnly;
