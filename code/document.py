


from ruamel.yaml import YAML
import sys
import io
import json
import pathlib
from bs4 import BeautifulSoup
import pprint
import re

yaml=YAML(typ='rt') 

BASE_URL = "https://peacefulscience.org"

def Document(filename):
  try: 
    return _Documents[filename]
  except KeyError:
    return _document(filename)  

class Document:
    live_documents = {}
    def __new__(cls, *args, **kwargs):
       filename = args[0]
       try: 
         return cls.live_documents[filename]
       except: 
         return object.__new__(cls)
       
    def __repr__(self):
       return 'Document("%s")' % self.filename
       
    def __init__(self, filename):
        if filename in Document.live_documents:
          assert Document.live_documents[filename] is self
          return

        Document.live_documents[filename] = self
        
        FM = []
        TXT = []
        self.filename = filename
        infrontmatter=False
        for line in open(filename).readlines():
            if line.strip()=="---":
                if infrontmatter: infrontmatter = False
                if not infrontmatter and not FM: infrontmatter = True
            else:
                if infrontmatter: FM.append(line)
                else: TXT.append(line)
        
        self.frontmatter = yaml.load("".join(FM))
        self.text = "".join(TXT)

        
    def __getitem__(self, key): return self.frontmatter[key]
    def __setitem__(self, key, value): self.frontmatter[key]=value
    
    def relpermalink(self):
        p = self.filename
        p = re.sub("^content", "", p)
        p = re.sub("\..*?$", "/", p)
        p = re.sub("/_?index/$", "/", p)
        return p
    
    def permalink(self):
       return BASE_URL + self.relpermalink()
        
    def authors(self):
        A = []
        for a in self.frontmatter["authors"]:
          a = a.lower().replace(" ", "-")
          A.append(Document("content/authors/%s/_index.md" % a))
        return A
 
    def pages(self):
        pages = self.frontmatter.get("pages", [])
        pages = [BASE_URL + p for p in pages]
        return pages
        
    def save(self):
        self.dump()
        
    def dump(self, file=sys.stdout):
        print("---", file=file)
        yaml.dump(self.frontmatter, file)
        print("---", file=file)
        print(self.text, file=file)
        

def main():
  D = Document("content/newsletter/top-2021.md")
  D.dump()


if __name__ == "__main__":
  main()


