// 秒数止める系関数
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
console.log("デバッグよう");
// 画像読み込み時にすべての移動ボタンを取得
window.onload = async () => {
    // 画面クリックしないと始まらないやつの対策
    var startBtn = document.querySelector(".pnlm-load-button");
    if (startBtn) {
        startBtn.click();
        await sleep(1000); //読み込み遅いから1秒待たないと移動ボタンの取得不可
    } else alert("再度ページを読み込んでください。");

    // すべての pnlm-hotspot クラスを持つ div 要素を取得
    var hotspots = document.querySelectorAll(".pnlm-hotspot");
    console.log("読み込み完了", hotspots);

    // 各ホットスポットにクリックリスナーを追加
    hotspots.forEach(function (hotspot) {
        console.log("リスナー追加しま");
        hotspot.addEventListener("click", function () {
            // クリックされた div の中の span タグを取得
            var span = this.querySelector("span");
            if (span) {
                // span タグのテキストを取得
                var text = span.textContent || span.innerText;
                console.log(text); // ここでテキストを処理
            }
        });
    });
};
