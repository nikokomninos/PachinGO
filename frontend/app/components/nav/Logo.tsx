import { useEffect, useState } from "react";

const Logo = ({ width }: { width: number }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("theme-changed", updateTheme);
    window.addEventListener("storage", updateTheme);
    return () => {
      window.removeEventListener("theme-changed", updateTheme);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  return (
    <img
      src={theme === "light" ? "/logo_outline.png" : "/logo_outline_dark.png"}
      alt="PachinGO! Logo, Large"
      className={`w-${width}`}
    />
  );
};

export default Logo;
