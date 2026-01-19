"""
thumbnail.py

Uses Pillow to programmatically generate a level's thumbnail
"""

from PIL import Image
import sys
import os
import json
import math


def main():

    # Path to the level's background image
    background_path = sys.argv[1]
    background = ""

    # The level's peg layout
    #layout_json = json.loads(sys.argv[2])
    #layout_raw = layout_json.get("data", {})
    #layout = {peg: json.loads(pegData) for peg, pegData in layout_raw.items()}
    layout_json = json.loads(sys.argv[2])
    layout = layout_json.get("data", {})

    # The level's bg opacity
    opacity_raw = sys.argv[3]
    opacity = int((float(opacity_raw) / 100) * 255)

    # The level's bg colors
    bg_hsl_json = json.loads(sys.argv[4])
    r, g, b = bg_hsl_json["H"], bg_hsl_json["S"], bg_hsl_json["L"]

    output_filename = sys.argv[5]

    image = Image.new(mode="RGBA", size=(646, 538), color=(r, g, b))

    script_dir = os.path.dirname(os.path.abspath(__file__))
    pegCircle = Image.open(os.path.join(script_dir, "pegCircle.png"))
    pegBrick = Image.open(os.path.join(script_dir, "pegBrick.png"))
    pegCurve = Image.open(os.path.join(script_dir, "pegCurve.png"))

    # If a user uplaoded a background,
    # paste it onto the colored background
    if background_path:
        background = Image.open(background_path)
        background = background.resize((646, 538))
        background = background.convert("RGBA")
        background.putalpha(opacity)
        image = Image.alpha_composite(image, background)

    # For each peg in the layout, paste at its
    # appropriate coordinates
    for peg, pegData in layout.items():
        if pegData["x"] < 70:
            continue

        match pegData["animation"]:
            case "CircleBlue":
                pegImage = pegCircle
            case "BrickBlue":
                pegImage = pegBrick
            case "CurveBlue":
                pegImage = pegCurve
            case _:
                continue

        degrees = pegData["angle"] * (180/math.pi)

        rotated = pegImage.rotate(-degrees, expand=True)

        x = pegData["x"] - 80 - (pegImage.width / 2)
        y = pegData["y"] - 55 - (pegImage.height / 2)

        image.paste(rotated, (int(x), int(y)), rotated)

    image.save(output_filename, "PNG")


if __name__ == "__main__":
    main()
