var viewer;
const JSONFILEPATH = "./positionInfos.json";
// JSONファイルからデータを読み込む
fetch(JSONFILEPATH) // 'data.json'はjsonファイルのパス
  .then((response) => response.json())
  .then((data) => {
    //sceneを作成
    const createPannellumScenes = (jsonData) => {
      const scenes = {};

      // 各positionIdをシーンとして追加
      jsonData.positions.forEach((position) => {
        const sceneId = position.positionId;
        const hotSpots = [];
        var yaw;
        var pitch;
        var count;

        position.moveSets.straight == true
          ? (count = 2)
          : (count = position.moveSets.locations.length);
        // 各ホットスポット（moveSet）を追加
        for (let i = 0; i < count; i++) {
          //まっすぐなとこのyaw pitch処理
          if (position.moveSets.straight == true) {
            // `positionId` 末尾の数字に対して1増やした地点と減らした地点を計算
            const basePositionNumber = parseInt(sceneId.slice(1)); // `A1` のように最初の文字を除外して数字を取得
            const incrementedPosition =
              sceneId.charAt(0) + (basePositionNumber + 1); // 数字を1増やした地点
            const decrementedPosition =
              sceneId.charAt(0) + (basePositionNumber - 1); // 数字を1減らした地点
            console.log("base", basePositionNumber);
            console.log("inc", incrementedPosition);
            console.log("dec", decrementedPosition);
            // `ranges` の値に応じてyawを決定
            if (i == 0) {
              yaw = 0;
            } else {
              yaw = 180;
            }

            // 自動的にlocationsを更新
            position.moveSets.locations = [
              incrementedPosition,
              decrementedPosition,
            ];
          }
          // まっすぐ以外
          else {
            yaw = calculateMidYaw(
              position.moveSets.ranges[i * 2],
              position.moveSets.ranges[i * 2 + 1]
            );
          }

          const pitch = 0;

          const targetLocation = position.moveSets.locations[i];
          // console.log({
          //   pitch: pitch,
          //   yaw: yaw,
          //   type: "scene",
          //   text: targetLocation,
          //   sceneId: targetLocation,
          // });
          hotSpots.push({
            pitch: pitch,
            yaw: yaw,
            type: "scene",
            text: targetLocation,
            sceneId: targetLocation,
          });
        }
        console.log("-------------------------------------");
        // 各positionに対応するシーンを生成
        scenes[sceneId] = {
          title: sceneId,
          type: "equirectangular",
          panorama: `image/360pic/${sceneId}.jpg`, // 各画像のパスを設定
          autoLoad: true,
          hotSpots: hotSpots,
        };
      });
      console.log(scenes);
      return scenes;
    };

    // pannellum viewerを生成
    viewer = pannellum.viewer("panorama", {
      default: {
        firstScene: "A0",
        sceneFadeDuration: 1000,
      },
      scenes: createPannellumScenes(data),
    });
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });
function changeCoordinateForPannellum(angle) {
  if (angle >= -180 && angle <= 0) {
    // 第2、第3象限 (0度から-180度)
    return angle;
  } else if (angle > 0 && angle <= 180) {
    // 第1、第4象限 (0度から180度)
    return angle;
  } else {
    // 範囲外の値は正規化してから再度変換
    let normalizedAngle = angle % 360;
    if (normalizedAngle < -180) {
      normalizedAngle += 360;
    } else if (normalizedAngle > 180) {
      normalizedAngle -= 360;
    }
    return Range.changeCoordinateForPannellum(normalizedAngle);
  }
}
function calculateMidYaw(yaw1, yaw2) {
  var tmp;
  if (yaw1 > yaw2) {
    tmp = yaw1;
    yaw1 = yaw2;
    yaw2 = tmp;
  }
  // yaw1とyaw2の値を -180 から 180 の範囲に正規化
  yaw1 = ((yaw1 + 180) % 360) - 180;
  yaw2 = ((yaw2 + 180) % 360) - 180;

  // 時計回りで進むように調整
  let diff = yaw2 - yaw1;
  if (diff < 0) {
    diff += 360; // 時計回りの差分に修正
  }

  // 中間のyawを計算
  const midYaw = yaw1 + diff / 2;

  // 中間のyawを -180 から 180 の範囲に正規化
  return ((midYaw + 180) % 360) - 180;
}
//二点間のyawの真ん中のyawを計算yaw1,yaw2大小不問
// function calculateMidYaw(yaw1, yaw2) {
//   console.log(yaw2, ((yaw2 + 180) % 360) - 180);
//   console.log(yaw1, ((yaw1 + 180) % 360) - 180);
// var tmp;
// if (yaw1 > yaw2) {
//   tmp = yaw1;
//   yaw1 = yaw2;
//   yaw2 = tmp;
// }
//   // yaw1とyaw2の値を -180 から 180 の範囲に正規化
//   yaw1 = ((yaw1 + 180) % 360) - 180;
//   yaw2 = ((yaw2 + 180) % 360) - 180;
//   console.log(yaw2);
//   // 差分を計算
//   let diff = yaw2 - yaw1;

//   // 差分が180を超える場合、逆回りでの距離を計算する
//   if (diff > 180) {
//     diff -= 360;
//   } else if (diff < -180) {
//     diff += 360;
//   }

//   // 中間のyawを計算
//   const midYaw = yaw1 + diff / 2;

//   // 中間のyawを -180 から 180 の範囲に正規化
//   return ((midYaw + 180) % 360) - 180;
// }

// viewer = pannellum.viewer("panorama", {
//   default: {
//     firstScene: "A0",
//     sceneFadeDuration: 1000,
//   },
//   scenes: {
//     A0: {
//       /*写真のタグ(ID)*/
//       title: "A0" /*表示する写真名(建物名)など必要あれば記入)*/,
//       type: "equirectangular", //表示方式,いじる必要なし
//       panorama: "image/360pic/A0.jpg" /*表示する写真のパス*/,
//       mapImage: "image/map/A0.jpg" /*表示するマップのパス*/,
//       autoLoad: true /*自動読み込み*/,
//       hotSpots: [
//         {
//           /*移動ボタン*/ pitch: 0 /*上下座標,0が真正面*/,
//           yaw: 0 /*左右座標,時計回り360度方式で90で右,270で左*/,
//           type: "scene",
//           text: "A1" /*行き先。ボタンにカーソルで表示*/,
//           sceneId: "A1" /*行き先の写真のタグ(ID)*/,
//         },
//       ],
//     },

//     A1: {
//       title: "A1",
//       type: "equirectangular",
//       panorama: "image/360pic/A1.jpg",
//       autoLoad: true /*自動読み込み*/,
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 0,
//           type: "scene",
//           text: "A2",
//           sceneId: "A2",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A0",
//           sceneId: "A0",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     A2: {
//       title: "A2",
//       type: "equirectangular",
//       panorama: "image/360pic/A2.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 0,
//           type: "scene",
//           text: "A3",
//           sceneId: "A3",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A1",
//           sceneId: "A1",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     A3: {
//       title: "A3",
//       type: "equirectangular",
//       panorama: "image/360pic/A3.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 0,
//           type: "scene",
//           text: "A4",
//           sceneId: "A4",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A2",
//           sceneId: "A2",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     A4: {
//       title: "A4",
//       type: "equirectangular",
//       panorama: "image/360pic/A4.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 0,
//           type: "scene",
//           text: "A5",
//           sceneId: "A5",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A3",
//           sceneId: "A3",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     A5: {
//       title: "A5",
//       type: "equirectangular",
//       panorama: "image/360pic/A5.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 0,
//           type: "scene",
//           text: "A6",
//           sceneId: "A6",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A4",
//           sceneId: "A4",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     A6: {
//       title: "A6",
//       type: "equirectangular",
//       panorama: "image/360pic/A6.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 45,
//           type: "scene",
//           text: "C0",
//           sceneId: "C0",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: -45,
//           type: "scene",
//           text: "B0",
//           sceneId: "B0",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: 180,
//           type: "scene",
//           text: "A5",
//           sceneId: "A5",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//     B0: {
//       title: "B0",
//       type: "equirectangular",
//       panorama: "image/360pic/B0.jpg",
//       hotSpots: [
//         {
//           pitch: 0,
//           yaw: 90,
//           type: "scene",
//           text: "B1",
//           sceneId: "B1",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//         {
//           pitch: 0,
//           yaw: -135,
//           type: "scene",
//           text: "A6",
//           sceneId: "A6",
//           targetYaw: 0,
//           targetPitch: 0,
//         },
//       ],
//     },
//   },
// });

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

//ここからmap

(function ($) {
  // function zoom_click
  function zoom_click() {
    if (
      navigator.userAgent.indexOf("iPhone") !== -1 ||
      navigator.userAgent.indexOf("iPad") !== -1 ||
      navigator.userAgent.indexOf("iPod") !== -1 ||
      navigator.userAgent.indexOf("Android") !== -1
    ) {
      return;
    }

    var element = $(this);

    if (!element.find("img").width()) {
      return;
    }

    var screen_w = $(window).width();
    var screen_h = $(window).height();
    var thumbnail_w = element.find("img").width();
    var thumbnail_h = element.find("img").height();
    var thumbnail_x = element.find("img").offset().left;
    var thumbnail_y = element.find("img").offset().top;

    if (
      element.css("position") !== "absolute" ||
      element.css("position") !== "fixed"
    ) {
      element.css("position", "relative");
    }

    //element.css( 'display', 'inline-block' );

    $("<span></span>")
      .appendTo(element)
      .attr("class", "loading-bg")
      .css({
        display: "block",
        width: thumbnail_w + "px",
        height: thumbnail_h + "px",
        position: "absolute",
        top: "0px",
        left: "0px",
        "z-index": "10",
        background: "rgba( 255, 255, 255, 0.5 )",
      })
      .html('<span class="loading"></span>');

    $("<img />")
      .appendTo("body")
      .attr("class", "big-image")
      .attr("src", element.attr("href"))
      .css("display", "none")
      .load(function () {
        var big_w = $(this).width();
        var big_h = $(this).height();
        var scroll_y = $(window).scrollTop();

        if (big_w > screen_w * 0.8 || big_h > screen_h * 0.8) {
          var ratio_w = screen_w / big_w;
          var ratio_h = screen_h / big_h;
          var ratio = Math.min(ratio_w, ratio_h);
          big_w = Math.floor(big_w * ratio * 0.9);
          big_h = Math.floor(big_h * ratio * 0.9);
        }

        $(this)
          .css({
            display: "block",
            width: thumbnail_w + "px",
            height: thumbnail_h + "px",
            position: "fixed",
            top: thumbnail_y - scroll_y + "px",
            left: thumbnail_x + "px",
            "z-index": "99",
          })
          .animate(
            {
              width: big_w + "px", //最終的な画像の大きさ？
              height: big_h + "px",
              top: "50%",
              left: "50%",
              marginTop: -big_h / 2 + "px",
              marginLeft: -big_w / 2 + "px",
            },
            /*画像拡大の速さ設定→*/ 350
          )
          .before('<div class="gray-layer"></div>');

        $(".gray-layer")
          .css({
            width: "100%",
            height: screen_h + "px",
            background: "#000000",
            opacity: "0",
            position: "fixed",
            top: "0px",
            left: "0px",
            "z-index": "99",
          })
          .animate(
            {
              opacity: "0.75",
            },
            400
          )
          .on("click", function () {
            var re_thumbnail_x = element.find("img").offset().left;
            var re_thumbnail_y = element.find("img").offset().top;
            var re_scroll_y = $(window).scrollTop();

            $(".big-image").animate(
              {
                width: thumbnail_w + "px",
                height: thumbnail_h + "px",
                top: re_thumbnail_y - re_scroll_y + "px",
                left: re_thumbnail_x + "px",
                marginTop: "0px",
                marginLeft: "0px",
              },
              /*画像縮小の速さ設定→*/ 350,
              "",
              function () {
                $(".gray-layer, .big-image").fadeOut(500, function () {
                  $(this).remove();
                });
              }
            );
          });

        $(".loading-bg").remove();
      });

    return false;
  }

  $("a.overlay-zoombox").on("click", zoom_click);
})(jQuery);

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
