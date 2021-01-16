

import requests
import base64
import datetime
from bs4 import BeautifulSoup


import yaml
    
url = "https://peacefulscience.org/wp-json/wp/v2/"
header = {}

TAGS = None
POSTS = None
CATEGORIES = None
AUTHORS = None



class WordpressPosts:
    def __init__(self):
      self.tags = get_tags()
      self.categories = get_categories()
      self.posts = get_posts()
      self.authors = get_authors()


def get_all_raw(endpoint="posts", params={}, per_page=100):
    J = [None]
    
    P = dict(params)
    P["per_page"] = per_page
    P["page"] = 1
    while J:
      response = requests.get(url + endpoint, headers=header, params=P)
      J = response.json()
    
      if "code" in J: break
      for j in J:
        yield j
      P["page"] += 1
        
def get_raw(endpoint="posts", params={}):
    
    response = requests.get(url + endpoint, headers=header, params=params)
    J = response.json()
    
    if "code" in J: return
    return J
        

        
def get_tags():
    global TAGS
    if TAGS: return TAGS
    def gen():
      for T in get_all_raw("tags"):
        yield T["id"], {"name": T["name"], "link": T["link"]}
    TAGS = dict(gen())
    return TAGS
        
def get_authors():
    global AUTHORS 
    if AUTHORS: return AUTHORS
    def gen(): 
      for A in get_all_raw("users"):
        yield A["id"], {"name": A["name"], "link": A["link"]}
    AUTHORS =  dict(gen())
    return AUTHORS

        
def get_categories():
    global CATEGORIES
    if CATEGORIES: return CATEGORIES
    def gen():
      for T in get_all_raw("categories"):
        yield T["id"], {"name": T["name"], "link": T["link"], "parent": T["parent"]}
    CATEGORIES = dict(gen())
    return CATEGORIES

def get_posts():
    global POSTS
    if POSTS: return POSTS
    
    TAGS = get_tags()
    CATEGORIES = get_categories()
    AUTHORS = get_authors()
    
    def gen():
      for P in get_all_raw('posts'): 
        yield {"id": P["id"], 
               "title": P["title"]['rendered'], 
               "link": P["link"],
               "excerpt": BeautifulSoup(P["excerpt"]['rendered']).get_text().strip() ,
               "featured_image": P["jetpack_featured_media_url"].split("?")[0],
               "date": datetime.datetime.fromisoformat(P["date_gmt"]).strftime("%B %-d, %Y"),
               "author": AUTHORS[P["author"]],
               "tags": [TAGS[p] for p in P["tags"]],
               "categories": [CATEGORIES[p] for p in P["categories"]],
               "discourse" : P["meta"]["discourse_permalink"]
            }
    POSTS = list(gen())
    return POSTS
  
import json      

if __name__ == "__main__":
  json.dump(list(get_all_raw("tags")), open("wp/tags.json",'w'), indent=2)
  json.dump(list(get_all_raw("categories")), open("wp/categories.json",'w'),  indent=2)
  json.dump(list(get_all_raw("posts")), open("wp/posts.json", 'w'),  indent=2)
  json.dump(list(get_all_raw("users")), open("wp/authors.json", 'w'),  indent=2)


