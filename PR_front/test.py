from moviepy.editor import VideoFileClip
from PIL import Image
import os

def compress_gif(input_path, output_path, target_size_kb, quality_step=5):
    """
    GIFを指定したサイズに圧縮する。
    
    Args:
        input_path (str): 元のGIFファイルのパス
        output_path (str): 圧縮後のGIFファイルの保存先
        target_size_kb (int): 目標サイズ（KB単位）
        quality_step (int): 圧縮品質を調整するステップサイズ（小さくすると詳細に調整）
    """
    try:
        # 動画としてGIFを読み込む
        clip = VideoFileClip(input_path)
        
        # 初期設定
        quality = 95
        temp_output = output_path
        
        # 現在のサイズを確認し、条件を満たすまでループ
        while quality > 10:  # 品質が低すぎる圧縮を防ぐ
            # GIFを書き出し
            clip.write_gif(temp_output, program='ImageMagick', fps=clip.fps, opt=True)
            
            # ファイルサイズを取得
            size_kb = os.path.getsize(temp_output) // 1024
            print(f"品質: {quality}, ファイルサイズ: {size_kb} KB")
            
            if size_kb <= target_size_kb:
                # 条件を満たす場合は終了
                break
            
            # 品質を下げる
            quality -= quality_step
        
        # 品質が十分に下がったら出力をそのまま保存
        os.rename(temp_output, output_path)
        print(f"圧縮後のGIFを保存しました: {output_path}")
        
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        
# 使用例
input_gif = "test.gif"  # 入力GIFファイルのパス
output_gif = "output_compressed.gif"  # 出力ファイルのパス
target_size = 500  # KBで指定

compress_gif(input_gif, output_gif, target_size)
