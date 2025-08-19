#!/bin/bash

# Simple publish script for Obsidian content
# Usage: ./publish.sh "Your commit message"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📝 Publishing content to GitHub...${NC}"

# Add all content changes
git add content/

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}No content changes to publish${NC}"
    exit 0
fi

# Commit with message or default
if [ -z "$1" ]; then
    COMMIT_MSG="Content update: $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

git commit -m "$COMMIT_MSG"

# Push to GitHub
git push

echo -e "${GREEN}✅ Content published successfully!${NC}"
echo -e "${GREEN}Your site will be updated shortly if you have auto-deploy enabled.${NC}"