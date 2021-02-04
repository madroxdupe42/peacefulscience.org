

import json
import pathlib

def load(f):
  return dict((j["id"], j) for j in json.load(open(f)))


def tags():
  for t in T.values():
    path = "content/categories/%s/" % t["slug"]
    p = pathlib.Path(path)
    p.mkdir(parents=True, exist_ok=True)

    with open(path + "_index.md", 'w') as f:
      f.write("---\ntitle: %s\n---" %t["name"])   


def authors():
  for a in A.values():
    path = "content/authors/%s/" % a["slug"]
    p = pathlib.Path(path)
    p.mkdir(parents=True, exist_ok=True)

    with open(path + "_index.md", 'w') as f:
      f.write("---\ntitle: %s\n---\n%s" %(a["name"], a["description"]))


T = load("wp/tags.json")
A = load("wp/authors.json")
C = load("wp/categories.json")
P = load("wp/posts.json")



tags()
authors()
