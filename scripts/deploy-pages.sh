#!/bin/bash
# Builds the static site and publishes it to the gh-pages branch (GitHub Pages).
# Usage: npm run deploy:pages
set -e
cd "$(dirname "$0")/.."
REPO_URL="$(git remote get-url origin)"
npm run build:pages
TMP="$(mktemp -d)"
cp -R .next-export/. "$TMP"/
touch "$TMP/.nojekyll"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-deploy}" -c user.email="${GIT_AUTHOR_EMAIL:-deploy@users.noreply.github.com}" commit -q -m "Deploy static site $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$REPO_URL" gh-pages
echo "Published. https://kamalasify96-web.github.io/unitedflowers-website/"
