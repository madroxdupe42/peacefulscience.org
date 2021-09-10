all: imginfo pdfinfo functions

algolia:
	hugo -e index
	npm run algolia

imginfo:
	python code/imgsize.py > data/imgsize.json

pdfinfo:
	python code/pdfinfo.py > data/pdfinfo.json

functions: 
	npx netlify-lambda build functions
