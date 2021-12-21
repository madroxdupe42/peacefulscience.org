ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: crossref

all: imginfo pdfinfo production

algolia: 
	hugo -e index
	npm run algolia

imginfo: static/img
	python code/imgsize.py > data/imgsize.json

pdfinfo: static/pdf
	python code/pdfinfo.py > data/pdfinfo.json

crossref:
	xmllint  --schema  crossref/schemas/crossref5.3.1.xsd  public/.xref/*.xml --nowarning --noout
	curl -s -F 'operation=doMDUpload' -F 'fname=@public/.xref/conf.xml' -F 'login_id=${CROSSREF_ID}' -F 'login_passwd=${CROSSREF_PASS}' https://doi.crossref.org/servlet/deposit | grep SUCCESS
	curl -s -F 'operation=doMDUpload' -F 'fname=@public/.xref/posted.xml' -F 'login_id=${CROSSREF_ID}' -F 'login_passwd=${CROSSREF_PASS}' https://doi.crossref.org/servlet/deposit | grep SUCCESS

princehack: prince-14.2-aws-lambda.zip
	unzip -q -o prince-14.2-aws-lambda.zip

prince-14.2-aws-lambda.zip:
	wget -q https://www.princexml.com/download/prince-14.2-aws-lambda.zip

ifeq ($(PRINCE),./prince)
production: princehack
else
production:
endif
	npm run tailwind
	hugo -b https://peacefulscience.org/ --minify	
	node code/render.js

princeclean:
	rm -rf `zipinfo -1  prince-14.2-aws-lambda.zip`

hugo-watch:
	hugo -w 

tailwind-watch:
	npm run tailwind
	fswatch  -0 -o -r layouts sources/tailwind.css | xargs -0 -n1 -I{} npm run tailwind

dev:
	echo built
	sleep 100000

dev1: hugo-watch tailwind-watch 
