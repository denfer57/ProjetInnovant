all: config/config.php vendor

config/config.php:
	cp config/config.default.php config/config.php

vendor:
	composer install

.PHONY: all
