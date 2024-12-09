var viewer;
firstSceneId_g = "J0";
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
        // 各hotspot（moveSet）を追加
        for (let i = 0; i < count; i++) {
          //直進のyaw pitch処理
          if (position.moveSets.straight == true) {
            // `positionId` 末尾の数字に対して1増やした地点と減らした地点を計算
            const basePositionNumber = parseInt(sceneId.slice(1)); // `A1` のように最初の文字を除外して数字を取得
            const incrementedPosition =
              sceneId.charAt(0) + (basePositionNumber + 1); // 数字を1増やした地点
            const decrementedPosition =
              sceneId.charAt(0) + (basePositionNumber - 1); // 数字を1減らした地点
            // `ranges` の値に応じてyawを決定
            yaw = i == 0 ? 0 : 180;
    
            // 自動的にlocationsを更新
            position.moveSets.locations = [incrementedPosition, decrementedPosition];
          } else {
            yaw = calculateMidYaw(
              position.moveSets.ranges[i * 2],
              position.moveSets.ranges[i * 2 + 1]
            );
          }
    
          const pitch = 0;
    
          const targetLocation = position.moveSets.locations[i];
          hotSpots.push({
            pitch: pitch,
            yaw: yaw,
            type: "scene",
            text: targetLocation,
            sceneId: targetLocation,
          });
        }
    
        // buildings情報からカスタムホットスポットを追加
        if (position.moveSets.buildings && position.moveSets.buildings.length > 0) {
          position.moveSets.buildings.forEach((building) => {
            hotSpots.push({
              pitch: building.pitch || 0,
              yaw: building.yaw || 0,
              type: "custom",
              cssClass: "custom-hotspot",
              createTooltipFunc: buildingHotspot,
              createTooltipArgs: {
                name: building.name,
                description: building.description,
                img: building.img,
              },
            });
          });
        }
    
        // 各positionに対応するシーンを生成
        scenes[sceneId] = {
          title: sceneId,
          type: "equirectangular",
          panorama: `image/360pic/${sceneId}.jpg`, // 各画像のパスを設定
          autoLoad: true,
          hotSpots: hotSpots,
        };
      });
      return scenes;
    };

    // カスタムホットスポットの作成関数
    function buildingHotspot(hotSpotDiv, args) {
      hotSpotDiv.classList.add('custom-hotspot');
      hotSpotDiv.style.width = '200px';
      hotSpotDiv.style.padding = '10px';
      hotSpotDiv.style.background = '#fff';
      hotSpotDiv.style.borderRadius = '10px';
      hotSpotDiv.style.textAlign = 'center';

      const title = document.createElement('h3');
      title.textContent = args.name;
      hotSpotDiv.appendChild(title);

      const description = document.createElement('p');
      description.textContent = args.description;
      hotSpotDiv.appendChild(description);
      console.log(args.img);
      if (args.img) {
        const image = document.createElement('img');
        image.src = `${args.img}`; // 画像のパスを適切に設定してください
        image.style.width = '100%';
        image.style.borderRadius = '5px';
        hotSpotDiv.appendChild(image);
      }
    }

    // カスタムホットスポット用のCSSを追加
    const style = document.createElement('style');
    style.innerHTML = `
    .custom-hotspot {
      width: 200px;
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      text-align: center;
    }
    .custom-hotspot h3 {
      margin: 0;
      font-size: 16px;
    }
    .custom-hotspot p {
      margin: 5px 0;
      font-size: 14px;
    }
    .custom-hotspot img {
      margin-top: 5px;
      width: 100%;
      border-radius: 5px;
    }
    `;
    document.head.appendChild(style);
    // pannellum viewerを生成
    viewer = pannellum.viewer("panorama", {
      default: {
        firstScene: firstSceneId_g,
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

  // 時計回りで進むよう調整
  let diff = yaw2 - yaw1;
  if (diff < 0) {
    diff += 360; // 時計回りの差分に修正
  }

  // 中間のyawを計算
  const midYaw = yaw1 + diff / 2;

  // 中間のyawを -180 から 180 の範囲に正規化
  return ((midYaw + 180) % 360) - 180;
}


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

document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.submenu a');  // メニュー内のリンクを取得
  menuLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();  // デフォルトのリンク動作を無効化
          const sceneId = this.getAttribute('data-scene-id');  // data属性からシーンIDを取得
          viewer.loadScene(sceneId);  // Pannellumのシーンをロード
      });
  });
});

/* --------ここからmap */

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
              width: big_w + "px",
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
