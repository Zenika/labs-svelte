.PHONY: all install build build-ci serve watch-serve watch check

pwd = $(shell pwd)

check:
	@echo $(shell which fswatch > /dev/null || echo install fswatch to use watch)

install: check
	docker pull bpetetot/claat

watch-serve:
	docker container run -p 9090:9090 -v $(pwd)/build:/app bpetetot/claat serve -addr 0.0.0.0:9090 &

watch: watch-serve
	fswatch -o codelab.md | xargs -n1 -L1 -I{} make build-ci

build:
	docker container run -it -v $(pwd):/app bpetetot/claat export codelab.md -f template.html

build-ci: install
	docker container run -v $(pwd):/app bpetetot/claat export codelab.md

serve: build
	docker container run -it -p 9090:9090 -v $(pwd)/build:/app bpetetot/claat serve -addr 0.0.0.0:9090