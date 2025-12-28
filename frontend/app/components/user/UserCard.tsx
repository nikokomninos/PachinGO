import { useEffect, useState } from "react";
import { Link } from "react-router";

const UserCard = ({ username, role }: { username: string; role: string }) => {
  const [roleStyle, setRoleStyle] = useState("");

  useEffect(() => {
    switch (role) {
      case "Moderator":
        setRoleStyle("text-green-500");
        break;
      case "PachinGOD":
        setRoleStyle("text-red-500");
        break;
    }
  }, []);

  return (
    <Link
      to={`/users/${username}`}
      className="flex flex-row items-center w-fit h-15 p-2 border-1 border-[var(--color-border)] rounded-lg tracking-tight bg-[var(--color-bg)] cursor-pointer hover:bg-[var(--color-bg-alt)] ease-linear duration-75"
    >
      <div className="flex justify-center items-center w-10 h-10 rounded-lg border-1 border-[var(--color-border)] mr-3">
        <img src="/logo_small.png" alt="PachinGO Logo, small" />
      </div>

      <div className="flex justify-center items-center w-fit">
        <h1 className={roleStyle}>{username}</h1>
      </div>
    </Link>
  );
};

export default UserCard;
