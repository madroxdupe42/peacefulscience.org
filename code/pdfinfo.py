import glob
from subprocess import check_output

OUT = [] 
for g in glob.glob("static/pdf/**/*.pdf", recursive=True): 
   url = g[6:]
   lastmod = check_output(["git", "log", "-1", '--pretty=%cI', g]).decode('utf-8').strip()
   OUT.append( {"File": url, "Lastmod": lastmod} )


OUT.sort(key=lambda x: x["File"])

import json

print(json.dumps(OUT, sort_keys=True, indent=4))
