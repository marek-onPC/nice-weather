#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://marek-onpc.github.io/nice-weather/
git push -f git@github.com:marek-onpc/nice-weather.git master:gh-pages

cd -