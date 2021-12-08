ifneq (,$(wildcard ./.env))
    include .env
    export
endif

all: imginfo pdfinfo production

algolia: 
	hugo -e index
	npm run algolia

imginfo: static/img
	python code/imgsize.py > data/imgsize.json

pdfinfo: static/pdf
	python code/pdfinfo.py > data/pdfinfo.json

crossref:
	echo curl -F 'operation=doQueryUpload' -F 'fname=@${CROSSREF_FILE}' -F 'login_id=${CROSSREF_ID}' -F 'login_passwd=${CROSSREF_PASS}' https://doi.crossref.org/servlet/deposit

princehack:
	wget https://www.princexml.com/download/prince-14.2-aws-lambda.zip
	unzip prince-14.2-aws-lambda.zip

production: princehack
	npm run tailwind
	hugo -b https://peacefulscience.org/ --minify	
	node code/render.js

hugo-watch:
	hugo -w 

tailwind-watch:
	npm run tailwind
	fswatch  -0 -o -r layouts sources/tailwind.css | xargs -0 -n1 -I{} npm run tailwind

dev:
	echo built
	sleep 100000

dev1: hugo-watch tailwind-watch 
