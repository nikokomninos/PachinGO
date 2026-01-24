import Level from "../models/Level.ts";
import User from "../models/User.ts";
import UserInfo from "../models/UserInfo.ts";

export const populateLevels = async () => {
  for (let i = 1; i <= 9; i++) {
    const newLevel = new Level({
      name: `My Level ${i}`,
      author: "testUser",
      description: `Desc ${i}`,
      pegLayout: { Peg1: "Test" },
      backgroundImage: "image",
      backgroundAudio: "audio",
      numOrange: "25",
      dateUploaded: new Date(),
    });
    await newLevel.save();
  }
};

export const populateUserInfo = async () => {
  const allUsers = await User.find();
  for (let i = 0; i < allUsers.length; i++) {
    const newUserInfo = new UserInfo({
      user: allUsers[i],
    });
    await newUserInfo.save();
  }
};
