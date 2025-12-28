import Footer from "~/components/nav/Footer";
import Navbar from "~/components/nav/Navbar";
import LevelCard from "~/components/level/LevelCard";
import UserBox from "~/components/user/UserBox";

import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ params }: any) {
  return [
    { title: `${params.username}'s Profile - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const user = () => {
  let { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<any>();
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const exists = await checkUserExits();
      if (exists) {
        await getUserLevels();
        setIsLoading(false);
      } else navigate("/error", { replace: true });
    })();
  }, []);

  const checkUserExits = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/users/getUser?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );
    const data = await res.json();
    if (data.result === "Not Found") return false;
    else {
      setUserInfo(data.result);
      return true;
    }
  };

  const getUserLevels = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/users/getUserLevels?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );
    const data = await res.json();
    setResults(data.results);
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[var(--color-bg)] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[var(--color-border)] border-r-1 border-r-[var(--color-border)] tracking-tighter min-h-screen">
          <div className="flex flex-row justify-start items-start gap-10">
            <UserBox
              username={username}
              role={userInfo.role}
              dateJoined={userInfo.dateJoined}
              numLevels={results.length}
            />
            <div className="border-1 border-[var(--color-border)] rounded-lg p-5 flex flex-col items-center w-full min-h-fit">
              <h1 className="text-2xl font-semibold mb-5">
                {username}'s Levels
              </h1>
              <div className="flex flex-wrap justify-center gap-5">
                {results.length > 0 ? (
                  results.map((r: any, i: any) => (
                    <LevelCard
                      key={i}
                      id={r.levelID}
                      name={r.name}
                      author={r.author}
                      desc={r.description}
                      thumbnail={
                        r.thumbnail
                          ? `${import.meta.env.VITE_R2_URL}/${r.thumbnail}`
                          : "/thumbnail.jpg"
                      }
                      plays={r.plays}
                      likes={r.likes}
                      dateUploaded={new Date(r.dateUploaded)}
                      numPegs={Object.keys(r.pegLayout.data).length - 3}
                      numOrange={r.numOrange}
                      numBalls={r.numBalls}
                      hasBackground={r.backgroundImage !== "N/A" ? "Yes" : "No"}
                      hasMusic={r.backgroundMusic !== "N/A" ? "Yes" : "No"}
                    />
                  ))
                ) : (
                  <h1 className="text-xl">
                    This user has not uploaded any levels yet.
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default user;
