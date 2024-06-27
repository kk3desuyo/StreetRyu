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
            "hotSpots": [ /*移動ボタン*/
                {
                    "pitch": 10,
                    "yaw": 0,
                    "type": "info",
                    "text": "１号館",
                    "URL": "https://wireless.ryukoku.ac.jp/in/map/s-1.pdf"
                },
                {
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
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}