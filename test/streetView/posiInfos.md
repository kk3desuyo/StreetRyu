それぞれの項目の意味
"positionId" //設定する地点の場所を指定
locations //positionId 地点における移動ボタンを指定
"ranges" //locations の判定範囲を指定(yaw)

# まっすぐな場所のテンプレ(ルートを跨ぐ時のまっすぐな場所には使用不可)

注意 ルートを跨ぐ時のまっすぐは straight false で設定する下の方を使用

## やる事

positionId を変更するのみで大丈夫

## テンプレ

{
"positionId": "A1",
"moveSets": {
"straight": true,
"ranges": [],
"locations": [],
"map": [68.4, 86.5]
}
},

上記のように設定すると
A1 の地点には-90,90 の範囲をクリックすると A2 に 90,270 の範囲には A0 に飛ぶように設定される

# まっすぐな場所以外のテンプレ && ルートを跨ぐ時のまっすぐ

# やる事

変更する場所
・positionId
・ranges
・locations

## テンプレ

{
"positionId": "A6",
"moveSets": {
"straight": false,
"ranges": [-90, 0, 0, 90, 90, 270],
"locations": ["B0", "C0", "A5"],
"map": [68.4, 73.5]
}
}

上記のように設定すると
A6 の地点では-90~0 は B0 に 0~90 は C0 に 90~270 は A5 に飛ぶようにせっていされます。
