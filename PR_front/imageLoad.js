//画像のロード関係の処理

// 秒数止める系関数
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 画像読み込み時にすべての移動ボタンを取得
window.onload = async () => {
  // 画面クリックしないと始まらないやつの対策
  var startBtn = document.querySelector(".pnlm-load-button");
  if (startBtn) {
    startBtn.click();
    await sleep(1000); //読み込み遅いから1秒待たないと移動ボタンの取得不可
  } else alert("再度ページを読み込んでください。");
  //リスナーの追加
  addListnerMoveBtn();
};

//画面に表示されている、移動ボタン全てにリスナーを追加する関数
async function addListnerMoveBtn() {
  // すべての pnlm-hotspot クラスを持つ div 要素を取得
  var hotspots = document.querySelectorAll(".pnlm-hotspot");
  console.log("読み込み完了", hotspots);

  // 各ホットスポットにクリックリスナーを追加
  hotspots.forEach(function (hotspot) {
    console.log("リスナー追加した", hotspots);
    hotspot.addEventListener("click", async function () {
      await sleep(1000); //次の地点の読み込み時間を考慮

      //移動ボタンがおされる = 違う場所なので一個先の画像読み込み　と　移動ボタンのリスナー追加
      loadImage();
      addListnerMoveBtn();
    });
  });
}

//現在の地点を取得するかんすう
//非同期処理で一個先の画像を読み込む関数
function loadImage() {}
