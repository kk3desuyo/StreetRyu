from PIL import Image

def rotate_360_image(image_path, output_path, angle):
    # 画像を開く
    img = Image.open(image_path)

    # 画像のサイズを取得
    width, height = img.size

    # ピクセル単位でのシフト量を計算 (画像の幅に基づく)
    shift_pixels = int((angle / 360.0) * width)

    # 左右のピクセルシフトに基づいて画像を切り取って結合
    left_part = img.crop((0, 0, shift_pixels, height))
    right_part = img.crop((shift_pixels, 0, width, height))

    # 左右を結合して回転をシミュレート
    new_img = Image.new("RGB", (width, height))
    new_img.paste(right_part, (0, 0))
    new_img.paste(left_part, (width - shift_pixels, 0))

    # 新しい画像を保存
    new_img.save(output_path)
    print(f"画像が保存されました: {output_path}")

# 360度画像のパス、出力パス、回転角度を指定して実行
img = 'M10'
image_path = '../image/360pic/' + img + '.JPG'  # 入力画像パス
output_path = '../image/360pic/' + img + '.JPG'      # 出力画像パス
angle = 5 # 回転させたい角度（例：90度）

rotate_360_image(image_path, output_path, angle)
