

import json
import pathlib

T = json.load(open("wp/tags.json"))

def tags():
  for t in T:
    path = "content/tags/%s/" % t["slug"]
    p = pathlib.Path(path)
    p.mkdir(parents=True, exist_ok=True)

    with open(path + "_index.md", 'w') as f:
      f.write("---\nname: %s\n---" %t["name"])   


A = json.load(open("wp/authors.json"))

def authors():
  for a in A:
    path = "content/authors/%s/" % a["slug"]
    p = pathlib.Path(path)
    p.mkdir(parents=True, exist_ok=True)

    with open(path + "_index.md", 'w') as f:
      f.write("---\nname: %s\n---\n%s" %(a["name"], a["description"]))


authors()
