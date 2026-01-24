const scriptsInEvents = {
  async Menu_Event1_Act4(runtime, localVars) {},

  async Menu_Event5_Act1(runtime, localVars) {},

  async Menu_Event5_Act2(runtime, localVars) {
    const env = localStorage.getItem("env");
    if (env === "dev") {
      runtime.globalVars.BackendURL = "http://localhost:9000";
      runtime.globalVars.R2URL =
        "https://pub-562122f32271414bacf25950b437b9c9.r2.dev";
    } else if (env === "prod") {
      runtime.globalVars.BackendURL = "https://api.playpachingo.com";
      runtime.globalVars.R2URL =
        "https://pub-420dc4c17ebf40e890bf857df37cacbb.r2.dev";
    }

    const layout = localStorage.getItem("layout");
    runtime.callFunction("CheckLayout", layout);
  },

  async Gameplay_Event44_Act4(runtime, localVars) {
    // Load the level editor peg layout into the
    // gameplay test layout

    const load = async () => {
      const res = await fetch(
        `${runtime.globalVars.BackendURL}/api/v1/level/loadLevel?levelID=${localStorage.getItem("levelID")}`,
        {
          method: "GET",
          mode: "cors",
        },
      );

      const data = await res.json();
      const layout = data.level.pegLayout.data;

      for (const key in layout) {
        const pegData = layout[key];

        const newPeg = runtime.objects.Peg.createInstance(
          "Pegs",
          pegData.x,
          pegData.y,
        );
        newPeg.angle = pegData.angle;
        newPeg.setAnimation(pegData.animation);
      }

      runtime.globalVars.NumberOfOrangePegsInLevel = data.level.numOrange;
      runtime.callFunction("SetNumOrange", data.level.numOrange);
      runtime.globalVars.BallCountOnStart = data.level.numBalls;
      runtime.callFunction("SetNumBalls", data.level.numBalls);
      runtime.globalVars.MusicSelect = data.level.musicSelect;

      runtime.globalVars.HWall = data.level.wallHSL.H;
      runtime.globalVars.SWall = data.level.wallHSL.S;
      runtime.globalVars.LWall = data.level.wallHSL.L;

      runtime.globalVars.HScore = data.level.scoreHSL.H;
      runtime.globalVars.SScore = data.level.scoreHSL.S;
      runtime.globalVars.LScore = data.level.scoreHSL.L;

      runtime.globalVars.HCrystal = data.level.crystalHSL.H;
      runtime.globalVars.SCrystal = data.level.crystalHSL.S;
      runtime.globalVars.LCrystal = data.level.crystalHSL.L;
      runtime.callFunction("SetUIHSL");

      runtime.globalVars.HBGColor = data.level.backgroundImageHSL.H;
      runtime.globalVars.SBGColor = data.level.backgroundImageHSL.S;
      runtime.globalVars.LBGColor = data.level.backgroundImageHSL.L;
      runtime.globalVars.BGIMageOpacity = data.level.backgroundImageOpacity;
      runtime.callFunction("SetBGHSL");

      //if (data.level.backgroundImage !== "N/A") runtime.callFunction("SetBG", `${runtime.globalVars.R2URL}/${data.level.backgroundImage}`);
      if (data.level.backgroundImage !== "N/A") {
        setTimeout(() => {
          runtime.callFunction(
            "SetBG",
            `${runtime.globalVars.R2URL}/${data.level.backgroundImage}`,
          );
        }, 50);
      }
      if (
        data.level.backgroundMusic !== "N/A" &&
        runtime.globalVars.MusicSelect === 6
      )
        runtime.callFunction(
          "SetMusic",
          `${runtime.globalVars.R2URL}/${data.level.backgroundMusic}`,
        );

      if (runtime.globalVars.MusicSelect !== 6)
        runtime.callFunction(
          "SetMusicNonCustom",
          runtime.globalVars.MusicSelect,
        );
    };

    if (runtime.layout.name === "Level Editor Play") {
      const dict = JSON.parse(runtime.globalVars.PegData).data;

      for (const key in dict) {
        const pegData = dict[key];

        const newPeg = runtime.objects.Peg.createInstance(
          "Pegs",
          pegData.x,
          pegData.y,
        );
        newPeg.angle = pegData.angle;
        newPeg.setAnimation(pegData.animation);
      }
    }

    if (runtime.layout.name === "Level Editor Online") {
      runtime.globalVars.MusicSelect = 99;
      await load();
      const menu = runtime.objects.backtohome.getFirstInstance();
      menu.destroy();
    }
  },

  async Gameplay_Event338_Act15(runtime, localVars) {
    // Gets the logged in user, and loads the previous state of the level editor peg layout

    const res = await fetch(`${runtime.globalVars.BackendURL}/api/v1/me`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    const data = await res.json();
    const username = data.name || "PachinGO! Player";

    runtime.globalVars.CustomerLevelAuthor = username;

    //runtime.globalVars.CustomerLevelAuthor = localStorage.getItem("user") || "PachinGO!";

    const pegDict = JSON.parse(runtime.globalVars.PegData).data;

    for (const key in pegDict) {
      const pegData = pegDict[key];

      const newPeg = runtime.objects.Peg.createInstance(
        "Pegs",
        pegData.x,
        pegData.y,
      );
      newPeg.angle = pegData.angle;
      newPeg.setAnimation(pegData.animation);
    }
  },

  async Gameplay_Event437_Act2(runtime, localVars) {
    const backgroundPicker = runtime.objects.ImageHere;
    const backgroundPickerInst = backgroundPicker.getFirstInstance();
    if (backgroundPickerInst)
      window.cachedBGFile = backgroundPickerInst.getFiles()[0];
  },

  async Gameplay_Event472_Act5(runtime, localVars) {
    const musicPicker = runtime.objects.MusicHere;
    const musicPickerInst = musicPicker.getFirstInstance();
    if (musicPickerInst) window.cachedMusicFile = musicPickerInst.getFiles()[0];
  },

  async Gameplay_Event511_Act3(runtime, localVars) {
    // Save the peg layout into a JSON

    const pegDict = {
      c2dictionary: true,
      data: {},
    };

    for (const peg of runtime.objects.Peg.getAllInstances()) {
      const key = "Peg" + peg.uid;

      if (peg.animationName === "CircleBlueActive")
        peg.setAnimation("CircleBlue");
      if (peg.animationName === "BrickBlueActive")
        peg.setAnimation("BrickBlue");
      if (peg.animationName === "CurveBlueActive")
        peg.setAnimation("CurveBlue");

      const pegData = {
        x: peg.x,
        y: peg.y,
        angle: peg.angle,
        animation: peg.animationName,
      };

      //pegDict.data[key] = JSON.stringify(pegData);
      pegDict.data[key] = pegData;
    }

    runtime.globalVars.PegData = JSON.stringify(pegDict);
  },

  async Gameplay_Event522_Act4(runtime, localVars) {
    // Save the peg layout into a JSON

    const pegDict = {
      c2dictionary: true,
      data: {},
    };

    for (const peg of runtime.objects.Peg.getAllInstances()) {
      const key = "Peg" + peg.uid;

      if (peg.hasTags("Master")) continue;

      if (peg.animationName === "CircleBlueActive")
        peg.setAnimation("CircleBlue");
      if (peg.animationName === "BrickBlueActive")
        peg.setAnimation("BrickBlue");
      if (peg.animationName === "CurveBlueActive")
        peg.setAnimation("CurveBlue");

      const pegData = {
        x: peg.x,
        y: peg.y,
        angle: peg.angle,
        animation: peg.animationName,
      };

      pegDict.data[key] = pegData;
    }

    runtime.globalVars.PegData = JSON.stringify(pegDict);
  },

  async Gameplay_Event522_Act5(runtime, localVars) {
    const pegs = JSON.parse(runtime.globalVars.PegData).data;

    const upload = async () => {
      const formData = new FormData();

      formData.append(
        "name",
        runtime.globalVars.CustomLevelName || "Custom Level",
      );
      formData.append("author", runtime.globalVars.CustomerLevelAuthor);
      formData.append(
        "desc",
        runtime.globalVars.CustomLevelDesc || "This level is so fun!",
      );
      formData.append("pegLayout", runtime.globalVars.PegData);
      formData.append(
        "numOrange",
        runtime.globalVars.NumberOfOrangePegsInLevel,
      );
      formData.append("numBalls", runtime.globalVars.BallCountOnStart);
      formData.append(
        "backgroundImageOpacity",
        runtime.globalVars.BGIMageOpacity,
      );
      formData.append(
        "backgroundImageHSL",
        JSON.stringify({
          H: runtime.globalVars.HBGColor,
          S: runtime.globalVars.SBGColor,
          L: runtime.globalVars.LBGColor,
        }),
      );
      formData.append("musicSelect", runtime.globalVars.MusicSelect);
      formData.append(
        "wallHSL",
        JSON.stringify({
          H: runtime.globalVars.HWall,
          S: runtime.globalVars.SWall,
          L: runtime.globalVars.LWall,
        }),
      );
      formData.append(
        "scoreHSL",
        JSON.stringify({
          H: runtime.globalVars.HScore,
          S: runtime.globalVars.SScore,
          L: runtime.globalVars.LScore,
        }),
      );
      formData.append(
        "crystalHSL",
        JSON.stringify({
          H: runtime.globalVars.HCrystal,
          S: runtime.globalVars.SCrystal,
          L: runtime.globalVars.LCrystal,
        }),
      );

      const backgroundPicker = runtime.objects.ImageHere;
      const musicPicker = runtime.objects.MusicHere;

      const backgroundPickerInst = backgroundPicker.getFirstInstance();
      const musicPickerInst = musicPicker.getFirstInstance();

      let backgroundFile = "";
      let musicFile = "";

      if (backgroundPickerInst)
        backgroundFile = backgroundPickerInst.getFiles()[0];
      if (musicPickerInst) musicFile = musicPickerInst.getFiles()[0];

      if (!backgroundFile) {
        try {
          backgroundFile = new File(
            [window.cachedBGFile],
            window.cachedBGFile.name,
          );
        } catch (e) {
          console.error(e);
        }
      }

      if (!musicFile) {
        try {
          musicFile = new File(
            [window.cachedMusicFile],
            window.cachedMusicFile.name,
          );
        } catch (e) {
          console.error(e);
        }
      }

      if (backgroundFile) {
        formData.append("background", backgroundFile, backgroundFile.name);
      }

      if (musicFile) {
        formData.append("music", musicFile, musicFile.name);
      }

      const res = await fetch(
        `${runtime.globalVars.BackendURL}/api/v1/level/uploadLevel`,
        {
          method: "POST",
          mode: "cors",
          body: formData,
        },
      );

      const data = await res.json();
      res.ok
        ? (runtime.globalVars.UploadStatus = 2)
        : (runtime.globalVars.UploadStatus = 1);
      if (res.ok) localStorage.setItem("levelID", data.levelID);
    };

    runtime.globalVars.BGIMageOpacity !== 0
      ? await upload()
      : (runtime.globalVars.UploadStatus = 1);
  },

  async Gameplay_Event525_Act8(runtime, localVars) {
    localStorage.setItem("uploaded", "true");
  },
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
