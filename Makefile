all: imginfo pdfinfo

imginfo:
	python code/imgsize.py > data/imgsize.json

pdfinfo:
	python code/pdfinfo.py > data/pdfinfo.json
