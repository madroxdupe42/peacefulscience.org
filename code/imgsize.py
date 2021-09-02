from PIL import Image
import glob
import json

OUT = {}
for f in glob.glob("static/img/**/*", recursive=True):
  try:
    with Image.open(f) as im:
       w, h = im.size
       OUT[f[6:]] = {"height": h, "width": w}
  except: pass

print(json.dumps(OUT, sort_keys=True, indent=4))
