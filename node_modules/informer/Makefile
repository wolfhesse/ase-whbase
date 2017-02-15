TITLE = [informer]
MOCHA_PATH = ./node_modules/.bin/mocha

all: install

install:
	@/bin/echo -e "${TITLE} installing dependencies ..." \
	&& npm install \
	&& /bin/echo -e "${TITLE} dependencies installed"

test:
	@/bin/echo -e "${TITLE} testing suite started..." \
	&& NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot

test-spec:
	@/bin/echo -e "${TITLE} testing suite started..." \
	&& NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter spec

test-w:
	@/bin/echo -e "${TITLE} testing suite started..." \
	&& NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot \
		--growl \
		--watch

.PHONY: all
.PHONY: install
.PHONY: test test-spec test-w