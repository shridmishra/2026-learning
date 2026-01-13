#!/bin/bash

# Finds and removes .git directories in subfolders to prevent submodules
# -mindepth 2 ensures we don't delete the root .git folder of the main repo

echo "Scanning for nested .git repositories..."

# Find .git directories that are at least 2 levels deep (e.g. ./folder/.git)
# -prune prevents descending into the .git directory itself
find . -mindepth 2 -name ".git" -type d -prune -exec echo "Removing nested: {}" \; -exec rm -rf {} +

echo "Done! You can now add these folders to your main git repo."
