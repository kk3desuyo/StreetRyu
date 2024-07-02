pannellum.viewer('panorama', {
    "default": {
        "firstScene": "hunsui",
        "sceneFadeDuration": 1000
    },
    "scenes": {
        "hunsui": { /*写真のタグ(ID)*/
            "title": "HUNSUI", /*表示する写真名(建物名)など必要あれば記入)*/
            "type": "equirectangular", //表示方式,いじる必要なし
            "panorama": "image/360pic/test.jpg", /*表示する写真のパス*/

            "autoLoad": true, /*自動読み込み*/
            "hotSpots": [ 
                {   /*インフォメーション*/
                    "pitch": 10,
                    "yaw": 0,
                    "type": "info",
                    "text": "１号館",
                    "URL": "https://wireless.ryukoku.ac.jp/in/map/s-1.pdf"
                },
                {   /*移動ボタン*/
                    "pitch": -20, /*上下座標,0が真正面*/
                    "yaw": 0, /*左右座標,時計回り360度方式で90で右,270で左*/
                    "type": "scene",
                    "text": "TEST HEYA", /*行き先。ボタンにカーソルで表示*/
                    "sceneId": "heya" /*行き先の写真のタグ(ID)*/
                }
            ]
        },

        "heya": {
            "title": "HEYA",
            "type": "equirectangular",
            "panorama": "image/360pic/test2.jpg",
            "hotSpots": [

                {
                    "pitch": 0,
                    "yaw": 0,
                    "type": "scene",
                    "text": "TEST HUNSUI",
                    "sceneId": "hunsui",
                    "targetYaw": 0,
                    "targetPitch": 0
                }
            ]
        }

    }
});

function toggleMenu() {
    var menu = document.getElementById('menuContent');
    var overlay = document.querySelector('.overlay');
    if (menu.style.transform === 'translateX(0%)') {
        menu.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none';
    } else {
        menu.style.transform = 'translateX(0%)';
        overlay.style.display = 'block';
    }
}

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    var arrow = section.previousElementSibling.querySelector('.arrow'); // 矢印要素を取得
    if (section.style.height !== '0px') {
        section.style.height = '0px';
        arrow.textContent = '▸'; // メニューが閉じるとき矢印を▷に変更
    } else {
        var sectionHeight = section.scrollHeight + 'px';
        section.style.height = sectionHeight;
        arrow.textContent = '▾'; // メニューが開くとき矢印を▽に変更
    }
}


document.addEventListener('click', function(event) {
    var menu = document.getElementById('menuContent');
    var overlay = document.querySelector('.overlay');
    var menuButton = document.querySelector('.menu img');
    if (!menu.contains(event.target) && !menuButton.contains(event.target) && menu.style.transform === 'translateX(0%)') {
        menu.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none';
    }
});