import ProfilePic from "./ProfilePic";

function setRoleStyle(role: string) {
  switch (role) {
    case "Moderator":
      return "text-green-500";
    case "PachinGOD":
      return "text-red-500";
    default:
      return "text-(--foreground-alt)";
  }
}

// A box visible on a user's public profile containing
// their public information
export default function UserBox({
  username,
  role,
  dateJoined,
  pfp,
}: {
  username: string;
  role: string;
  dateJoined: Date;
  pfp: string;
}) {
  const formattedDate = new Date(dateJoined).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const roleStyle = setRoleStyle(role);

  return (
    <div className="bg-(--background-alt) flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 border border-(--border) p-5 rounded-lg h-fit w-fit md:w-full mb-4 md:mb-6">
      <div className="flex justify-center items-center w-50 h-50 rounded-lg border border-(--border-alt) bg-(--background-alt)/50">
        <ProfilePic username={username} pfp={pfp}/>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl wrap-break-word whitespace-normal w-full">
          {username}
        </h1>

        <div>
          <h2 className="text-sm">Role</h2>
          <p className={`text-xs ${roleStyle}`}>{role}</p>
        </div>

        <div>
          <h2 className="text-sm">Member Since</h2>
          <p className="text-xs text-(--foreground-alt)">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
