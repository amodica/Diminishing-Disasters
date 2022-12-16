.DEFAULT_GOAL := all
SHELL := bash

all:

# check files
C_FILES :=
	.gitignore
	.gitlab-ci.yml

check: $(C_FILES)
