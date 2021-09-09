all: imginfo pdfinfo

algolia:
	hugo -e index
	npm run algolia

imginfo:
	python code/imgsize.py > data/imgsize.json

pdfinfo:
	python code/pdfinfo.py > data/pdfinfo.json
