.PHONY: help install dev build test

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Setup all project dependencies
	npm i

dev: ## Launch front
	npm run dev

serv: ## Launch API
	npm un serv

build:
	npm run build
