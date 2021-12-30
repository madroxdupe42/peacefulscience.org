import json
import random
import sys
import re


doiprefix="10.54739"
CHAR = "abcdeghijkmopqrtuvwxy12346789"

DOI = json.load(open("data/doi.json"))

dois = set(DOI.values())

def randomchars(n):
  return "".join(random.choice(CHAR) for i in range(n))

def randomdoi():
  return doiprefix + "/" + randomchars(4)

def newdoi():
  while True:
    d = randomdoi()
    if d not in dois: break
  return d



for rel in sys.argv[1:]:
  rel = re.sub("^content", "", rel)
  rel = re.sub("\.md$", "/", rel)
  if rel in DOI:
    print("%s already assigned DOI" % rel)
  else:
    DOI[rel] = newdoi()
    print("%s assigned %s" %( DOI[rel], rel ))


OUT = json.dumps(DOI, sort_keys=True, indent=4)
print(OUT)

print(OUT, file=open("data/doi.json", "w"))  
