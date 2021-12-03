all: imginfo pdfinfo production

algolia: 
	hugo -e index
	npm run algolia

imginfo: static/img
	python code/imgsize.py > data/imgsize.json

pdfinfo: static/pdf
	python code/pdfinfo.py > data/pdfinfo.json


production:
	hugo -b https://peacefulscience.org/
	node code/render.js
	npm run algolia
	
