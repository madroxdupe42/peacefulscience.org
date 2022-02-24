from dotenv import load_dotenv
from code.document import Document
import os
import sys
import requests
import datetime 

load_dotenv()

CATEGORY = 8
BASE = "https://discourse.peacefulscience.org"

HEADERS = {"Api-Key": os.environ["DISCOURSE_API"], "Api-Username": "system"}
PATH = sys.argv[1]
D = Document(PATH)

# POST = [] # ["> " + line for line in  D.text.split("\n")]


try: 
  POST = "https://peacefulscience.org" +  D["headerimage"]["src"]
except:
  POST = ""

POST +=  "\n\n" + D.permalink() 
POST += "\n\n> " + D["description"]

if "content/newsletter" in PATH:
  POST += "\n\n" + D.text

POST += "\n\n" + "\n\n".join(D.pages())

# print(POST)

URL = "%s/posts.json" % BASE
# print(len(D["description"]))

PARAMS = {
  "raw": POST,
  "category": CATEGORY,
  "title": D.frontmatter["title"],
  "embed_url": D.permalink()
}

# print(PARAMS)

R = requests.post(URL, headers=HEADERS, data=PARAMS);


TOPIC_ID = int(R.json()["topic_id"])


URL = "%s/t/%d/status.json" % (BASE, TOPIC_ID)

PARAMS = {
  "status": "pinned_globally",
  "enabled": "true",
  "until": str(datetime.datetime.now() + datetime.timedelta(days=14))
}

R = requests.put(URL, headers=HEADERS, data=PARAMS);
