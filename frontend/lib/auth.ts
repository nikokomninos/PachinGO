import { authClient } from "./auth-client";

export async function getLoggedInUser() {
  const { data: session } = await authClient.getSession();

  if (!session) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getUser?name=${session.user.name}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return { session, userInfo: data.userInfo };
}
