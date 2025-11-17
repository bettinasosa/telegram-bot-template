# Git Tutorial for Beginners

Welcome! This guide will teach you the essentials of Git, a version control system that helps you track changes in your code and collaborate with others.

## Table of Contents

- [What is Git?](#what-is-git)
- [Why Use Git?](#why-use-git)
- [Key Concepts](#key-concepts)
- [Installation & Setup](#installation--setup)
- [Essential Commands](#essential-commands)
- [Common Workflows](#common-workflows)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

---

## What is Git?

Git is a **distributed version control system** that tracks changes in your files over time. Think of it as a "save game" feature for your code—you can go back to any previous version, see what changed, and work on multiple features simultaneously without breaking your main code.

## Why Use Git?

- **📸 History**: See every change ever made to your project
- **🔄 Collaboration**: Work with others without overwriting each other's code
- **🌿 Branching**: Experiment with new features safely
- **⏮️ Undo**: Easily revert mistakes
- **☁️ Backup**: Keep your code safe on remote servers (like GitHub)

---

## Key Concepts

### Repository (Repo)

A folder that Git is tracking. Contains all your files and the complete history of changes.

### Commit

A snapshot of your project at a specific point in time. Like a checkpoint in a video game.

### Branch

A parallel version of your code. Lets you work on new features without affecting the main code.

### Remote

A version of your repository hosted on the internet (e.g., GitHub, GitLab).

### Clone

Making a copy of a remote repository on your computer.

### Push/Pull

- **Push**: Send your local commits to the remote repository
- **Pull**: Download commits from the remote repository to your local machine

---

## Installation & Setup

### Install Git

**macOS:**

```bash
# Using Homebrew
brew install git

# Or download from git-scm.com
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win)

### Verify Installation

```bash
git --version
```

### Initial Configuration

Set your name and email (this info will be attached to your commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify your settings:

```bash
git config --list
```

---

## Essential Commands

### Starting a New Repository

```bash
# Create a new folder and navigate into it
mkdir my-project
cd my-project

# Initialize Git in this folder
git init
```

### Cloning an Existing Repository

```bash
# Clone this telegram bot template
git clone https://github.com/yourusername/telegram-bot-template.git
cd telegram-bot-template
```

### Checking Status

```bash
# See which files have changed
git status
```

### Staging Changes

```bash
# Stage a specific file
git add filename.ts

# Stage all changes
git add .

# Stage all TypeScript files
git add *.ts
```

### Committing Changes

```bash
# Commit with a message
git commit -m "Add hello command"

# Commit with a detailed message (opens editor)
git commit
```

### Viewing History

```bash
# See commit history
git log

# See a simplified one-line history
git log --oneline

# See last 5 commits
git log -5
```

### Working with Branches

```bash
# See all branches
git branch

# Create a new branch
git branch feature/new-command

# Switch to a branch
git checkout feature/new-command

# Create and switch in one command
git checkout -b feature/new-command

# Delete a branch
git branch -d feature/new-command
```

### Pushing & Pulling

```bash
# Push your commits to remote
git push origin main

# Push a new branch
git push origin feature/new-command

# Pull latest changes from remote
git pull origin main
```

### Merging Branches

```bash
# Switch to the branch you want to merge INTO
git checkout main

# Merge another branch into current branch
git merge feature/new-command
```

---

## Common Workflows

### Workflow 1: Making Changes to Existing Code

```bash
# 1. Make sure you're on the main branch
git checkout main

# 2. Get the latest changes
git pull origin main

# 3. Create a new branch for your work
git checkout -b feature/add-start-command

# 4. Make your changes to the code
# ... edit files ...

# 5. Check what changed
git status
git diff

# 6. Stage your changes
git add src/commands/start.ts

# 7. Commit your changes
git commit -m "Add start command for bot initialization"

# 8. Push to remote
git push origin feature/add-start-command

# 9. Create a Pull Request on GitHub (through web interface)
```

### Workflow 2: Starting Fresh with This Template

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/telegram-bot-template.git
cd telegram-bot-template

# 2. Install dependencies
pnpm install

# 3. Create a new branch for your bot
git checkout -b my-awesome-bot

# 4. Customize the bot
# ... make changes ...

# 5. Commit your changes regularly
git add .
git commit -m "Configure bot for my use case"

# 6. Push to your repository
git push origin my-awesome-bot
```

### Workflow 3: Keeping Your Fork Updated

```bash
# 1. Add the original repo as "upstream"
git remote add upstream https://github.com/original/telegram-bot-template.git

# 2. Fetch latest changes
git fetch upstream

# 3. Switch to your main branch
git checkout main

# 4. Merge upstream changes
git merge upstream/main

# 5. Push updates to your fork
git push origin main
```

---

## Best Practices

### Commit Messages

✅ **Good commit messages:**

```bash
git commit -m "Add token gating feature for premium users"
git commit -m "Fix bug in hello command response"
git commit -m "Update README with deployment instructions"
```

❌ **Bad commit messages:**

```bash
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "asdfjkl"
```

**Conventional Commits Format** (recommended):

```bash
feat: add new command for user statistics
fix: resolve memory leak in message handler
docs: update GIT_TUTORIAL.md with examples
refactor: simplify logger utility
test: add unit tests for token gating
```

### Commit Frequency

- **Commit often**: Small, focused commits are better than large ones
- **Commit logical units**: Each commit should represent one logical change
- **Don't commit broken code**: Make sure your code works before committing

### What NOT to Commit

Create a `.gitignore` file to exclude:

```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Build outputs
dist/
build/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# IDE settings
.vscode/
.idea/
```

### Branch Naming

Use descriptive names with prefixes:

- `feature/` - New features: `feature/user-authentication`
- `fix/` - Bug fixes: `fix/memory-leak`
- `docs/` - Documentation: `docs/update-readme`
- `refactor/` - Code improvements: `refactor/optimize-database`
- `test/` - Adding tests: `test/command-handlers`

---

## Troubleshooting

### "I committed to the wrong branch!"

```bash
# If you haven't pushed yet, move the commit to another branch
git log  # Find the commit hash
git checkout correct-branch
git cherry-pick <commit-hash>
git checkout wrong-branch
git reset --hard HEAD~1  # Remove the commit from wrong branch
```

### "I need to undo my last commit"

```bash
# Keep the changes, just undo the commit
git reset --soft HEAD~1

# Completely discard the commit and changes (CAREFUL!)
git reset --hard HEAD~1
```

### "I have uncommitted changes but need to switch branches"

```bash
# Option 1: Commit them
git add .
git commit -m "WIP: work in progress"

# Option 2: Stash them temporarily
git stash
git checkout other-branch
# ... do work ...
git checkout original-branch
git stash pop
```

### "My local branch is behind remote"

```bash
# Pull the latest changes
git pull origin main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge remote changes"
```

### "I accidentally deleted a file"

```bash
# Restore a single file from last commit
git checkout HEAD -- filename.ts

# Restore all files to last commit
git reset --hard HEAD
```

### "How do I undo a push?"

```bash
# If no one else has pulled your changes yet:
git reset --hard HEAD~1
git push --force origin branch-name

# ⚠️ Warning: Only do this if you're working alone or immediately after pushing!
```

### "There's a merge conflict!"

When Git can't automatically merge changes:

```bash
# 1. Git will mark conflicts in your files like this:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 2. Edit the file, choose which changes to keep

# 3. Remove the conflict markers (<<<, ===, >>>)

# 4. Stage the resolved file
git add conflicted-file.ts

# 5. Complete the merge
git commit -m "Resolve merge conflict"
```

---

## Additional Resources

### Visual Tools

- **GitHub Desktop**: GUI for Git (beginner-friendly)
- **GitKraken**: Advanced GUI with visual branch history
- **VS Code**: Built-in Git integration

### Learning Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Skills](https://skills.github.com/) - Interactive tutorials
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Fixing common mistakes
- [Git Explorer](https://gitexplorer.com/) - Find the right commands

### Quick Reference Cheat Sheet

```bash
# Setup & Config
git config --global user.name "name"
git config --global user.email "email"

# Create & Clone
git init
git clone <url>

# Status & History
git status
git log
git log --oneline

# Stage & Commit
git add <file>
git add .
git commit -m "message"

# Branches
git branch
git branch <name>
git checkout <branch>
git checkout -b <branch>
git merge <branch>

# Remote
git remote add origin <url>
git push origin <branch>
git pull origin <branch>

# Undo
git reset --soft HEAD~1
git reset --hard HEAD~1
git checkout -- <file>
git stash
git stash pop
```

---

## Practice Exercise

Try this quick exercise to practice:

```bash
# 1. Create a practice repository
mkdir git-practice
cd git-practice
git init

# 2. Create a file
echo "# My Practice Project" > README.md

# 3. Stage and commit
git add README.md
git commit -m "Initial commit"

# 4. Create a branch
git checkout -b feature/add-description

# 5. Make changes
echo "This is a practice project to learn Git" >> README.md

# 6. Commit changes
git add README.md
git commit -m "Add project description"

# 7. Switch back to main
git checkout main

# 8. Merge your changes
git merge feature/add-description

# 9. View history
git log --oneline
```

Congratulations! You've learned the basics of Git. Remember, the best way to learn is by practicing. Don't be afraid to experiment—Git makes it hard to permanently lose your work!

---

**Questions?** Check the [Additional Resources](#additional-resources) or open an issue on GitHub.

Happy coding! 🚀
