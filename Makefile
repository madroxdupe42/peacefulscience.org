

all: algolia imginfo pdfinfo 

algolia: 
	hugo -e index
	npm run algolia

imginfo: static/img
	python code/imgsize.py > data/imgsize.json

pdfinfo: static/pdf
	python code/pdfinfo.py > data/pdfinfo.json

