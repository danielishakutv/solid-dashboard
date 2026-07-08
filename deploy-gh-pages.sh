#!/usr/bin/env bash
#
# One-shot publish of the SOLID Dashboard demo to GitHub Pages.
# Run this in Git Bash from the project folder:  bash deploy-gh-pages.sh
#
# Requires: gh (already authenticated) + node/npm.  Creates a PUBLIC repo.
set -euo pipefail

REPO="solid-dashboard"
cd "$(dirname "$0")"

echo "==> 1/5  Creating public repo '$REPO' and pushing source…"
if git remote get-url origin >/dev/null 2>&1; then
  echo "    origin already set — skipping repo create, pushing instead."
  git push -u origin main
else
  gh repo create "$REPO" --public --source=. --remote=origin --push \
    --description "SOLID Project — Administrative Performance Dashboard (demo / proof of concept) for the Adamawa State PCU. Built with Next.js. Demo data only."
fi

OWNER="$(gh api user --jq .login)"

echo "==> 2/5  Building static export…"
npm run build

echo "==> 3/5  Preparing gh-pages payload…"
touch out/.nojekyll

echo "==> 4/5  Publishing out/ to the gh-pages branch…"
pushd out >/dev/null
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="Daniel Ishaku" -c user.email="talk2ishakudaniel@gmail.com" \
    commit -qm "Deploy SOLID Dashboard demo to GitHub Pages"
git push -qf "https://github.com/$OWNER/$REPO.git" gh-pages
popd >/dev/null

echo "==> 5/5  Enabling GitHub Pages (source: gh-pages branch)…"
gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null 2>&1 \
  || gh api -X PUT "repos/$OWNER/$REPO/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null 2>&1 \
  || echo "    (Pages may already be enabled — check repo Settings › Pages)"

echo ""
echo "============================================================"
echo " Done!  Your demo will be live in ~1-2 minutes at:"
echo "   https://$OWNER.github.io/$REPO/"
echo " Repo: https://github.com/$OWNER/$REPO"
echo "============================================================"
