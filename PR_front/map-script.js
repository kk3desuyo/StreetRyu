viewer = pannellum.viewer("panorama", {
  default: {
    firstScene: "A0",
    sceneFadeDuration: 1000,
  },
  scenes: {
    A0: {
      /*写真のタグ(ID)*/
      title: "A0" /*表示する写真名(建物名)など必要あれば記入)*/,
      type: "equirectangular", //表示方式,いじる必要なし
      panorama: "image/360pic/A0.jpg" /*表示する写真のパス*/,
      autoLoad: true /*自動読み込み*/,
      hotSpots: [
        {
          /*移動ボタン*/ pitch: 0 /*上下座標,0が真正面*/,
          yaw: 0 /*左右座標,時計回り360度方式で90で右,270で左*/,
          type: "scene",
          text: "A1" /*行き先。ボタンにカーソルで表示*/,
          sceneId: "A1" /*行き先の写真のタグ(ID)*/,
        },
        // {
        //   /*移動ボタン*/ pitch: 0 /*上下座標,0が真正面*/,
        //   yaw: 180 /*左右座標,時計回り360度方式で90で右,270で左*/,
        //   type: "scene",
        //   text: "hunsui" /*行き先。ボタンにカーソルで表示*/,
        //   sceneId: "hunsui" /*行き先の写真のタグ(ID)*/,
        // },
        // {
        //   /*インフォメーション*/ pitch: 10,
        //   yaw: 0,
        //   type: "info",
        //   text: "１号館",
        //   URL: "https://wireless.ryukoku.ac.jp/in/map/s-1.pdf",
        // },
      ],
    },

    A1: {
      title: "A1",
      type: "equirectangular",
      panorama: "image/360pic/A1.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "A2",
          sceneId: "A2",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A0",
          sceneId: "A0",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    A2: {
      title: "A2",
      type: "equirectangular",
      panorama: "image/360pic/A2.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "A3",
          sceneId: "A3",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A1",
          sceneId: "A1",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    A3: {
      title: "A3",
      type: "equirectangular",
      panorama: "image/360pic/A3.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "A4",
          sceneId: "A4",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A2",
          sceneId: "A2",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    A4: {
      title: "A4",
      type: "equirectangular",
      panorama: "image/360pic/A4.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "A5",
          sceneId: "A5",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A3",
          sceneId: "A3",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    A5: {
      title: "A5",
      type: "equirectangular",
      panorama: "image/360pic/A5.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          text: "A6",
          sceneId: "A6",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A4",
          sceneId: "A4",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    A6: {
      title: "A6",
      type: "equirectangular",
      panorama: "image/360pic/A6.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 45,
          type: "scene",
          text: "B0",
          sceneId: "B0",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: 180,
          type: "scene",
          text: "A5",
          sceneId: "A5",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
    B0: {
      title: "B0",
      type: "equirectangular",
      panorama: "image/360pic/B0.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 90,
          type: "scene",
          text: "B1",
          sceneId: "B1",
          targetYaw: 0,
          targetPitch: 0,
        },
        {
          pitch: 0,
          yaw: -135,
          type: "scene",
          text: "A6",
          sceneId: "A6",
          targetYaw: 0,
          targetPitch: 0,
        },
      ],
    },
  },
});

function toggleMenu() {
  var menu = document.getElementById("menuContent");
  var overlay = document.querySelector(".overlay");
  if (menu.style.transform === "translateX(0%)") {
    menu.style.transform = "translateX(-100%)";
    overlay.style.display = "none";
  } else {
    menu.style.transform = "translateX(0%)";
    overlay.style.display = "block";
  }
}

function toggleSection(sectionId) {
  var section = document.getElementById(sectionId);
  var arrow = section.previousElementSibling.querySelector(".arrow"); // 矢印要素を取得
  if (section.style.height !== "0px") {
    section.style.height = "0px";
    arrow.textContent = "▸"; // メニューが閉じるとき矢印を▷に変更
  } else {
    var sectionHeight = section.scrollHeight + "px";
    section.style.height = sectionHeight;
    arrow.textContent = "▾"; // メニューが開くとき矢印を▽に変更
  }
}

document.addEventListener("click", function (event) {
  var menu = document.getElementById("menuContent");
  var overlay = document.querySelector(".overlay");
  var menuButton = document.querySelector(".menu img");
  if (
    !menu.contains(event.target) &&
    !menuButton.contains(event.target) &&
    menu.style.transform === "translateX(0%)"
  ) {
    menu.style.transform = "translateX(-100%)";
    overlay.style.display = "none";
  }
});
