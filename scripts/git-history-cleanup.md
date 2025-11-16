# Git History Cleanup Guide

This guide helps you clean up git history by squashing commits and creating meaningful commit messages.

## Current Git History

```
f2ca9db docs: Add strategic optimization plan and deep analysis report
bf1ba83 feat: Redesign homepage with enhanced light theme, language switcher, and Framer Motion theme transitions
62cc146 Complete Next.js 15 upgrade and component improvements
4c1d5a4 feat: Upgrade to Next.js 15 and React 19
0617448 ✨ Enhance animated background and clean up components
b4234a4 🔧 Update dependencies, enhance SEO, and refine styles
abde2f3 🚀 Complete Next.js migration with 30 pages
7f79cba Initial commit from Create Next App
```

## Recommended Squash Strategy

### Option 1: Squash into Logical Groups

**Group 1: Initial Setup**
- `7f79cba` Initial commit from Create Next App
- `abde2f3` Complete Next.js migration with 30 pages
→ **Squash to:** `feat: Initial Next.js migration and project setup`

**Group 2: Dependencies & SEO**
- `b4234a4` Update dependencies, enhance SEO, and refine styles
- `0617448` Enhance animated background and clean up components
→ **Squash to:** `feat: Update dependencies and enhance SEO implementation`

**Group 3: Next.js 15 Upgrade**
- `4c1d5a4` Upgrade to Next.js 15 and React 19
- `62cc146` Complete Next.js 15 upgrade and component improvements
→ **Squash to:** `feat: Upgrade to Next.js 15 and React 19`

**Group 4: UI Enhancements**
- `bf1ba83` Redesign homepage with enhanced light theme, language switcher, and Framer Motion theme transitions
→ **Keep as:** `feat: Redesign homepage with enhanced light theme and language switcher`

**Group 5: Documentation**
- `f2ca9db` Add strategic optimization plan and deep analysis report
→ **Keep as:** `docs: Add strategic optimization plan and deep analysis report`

## Interactive Rebase Commands

### Step 1: Start Interactive Rebase

```bash
# Rebase from the initial commit (8 commits back)
git rebase -i HEAD~8

# Or rebase from a specific commit
git rebase -i 7f79cba
```

### Step 2: Edit the Rebase File

The editor will show:
```
pick 7f79cba Initial commit from Create Next App
pick abde2f3 🚀 Complete Next.js migration with 30 pages
pick b4234a4 🔧 Update dependencies, enhance SEO, and refine styles
pick 0617448 ✨ Enhance animated background and clean up components
pick 4c1d5a4 feat: Upgrade to Next.js 15 and React 19
pick 62cc146 Complete Next.js 15 upgrade and component improvements
pick bf1ba83 feat: Redesign homepage with enhanced light theme, language switcher, and Framer Motion theme transitions
pick f2ca9db docs: Add strategic optimization plan and deep analysis report
```

Change to:
```
pick 7f79cba Initial commit from Create Next App
squash abde2f3 🚀 Complete Next.js migration with 30 pages
pick b4234a4 🔧 Update dependencies, enhance SEO, and refine styles
squash 0617448 ✨ Enhance animated background and clean up components
pick 4c1d5a4 feat: Upgrade to Next.js 15 and React 19
squash 62cc146 Complete Next.js 15 upgrade and component improvements
pick bf1ba83 feat: Redesign homepage with enhanced light theme, language switcher, and Framer Motion theme transitions
pick f2ca9db docs: Add strategic optimization plan and deep analysis report
```

### Step 3: Edit Commit Messages

When you squash, Git will open an editor for you to write the new commit message:

```
# This is a combination of 2 commits.
# This is the 1st commit message:

Initial commit from Create Next App

# This is the commit message #2:

🚀 Complete Next.js migration with 30 pages

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```

Replace with:
```
feat: Initial Next.js migration and project setup

- Complete Next.js migration with 30 pages
- Set up App Router architecture
- Configure TypeScript and ESLint
- Add initial component structure
```

### Step 4: Force Push (if needed)

⚠️ **WARNING:** Only force push if you're working alone or have team approval!

```bash
# If you've already pushed, you'll need to force push
git push --force-with-lease origin main

# Or create a new branch for the cleaned history
git checkout -b main-clean-history
git push origin main-clean-history
```

## Alternative: Create a Clean History Branch

If you want to preserve the original history:

```bash
# Create a new orphan branch (no history)
git checkout --orphan main-clean

# Add all files
git add .

# Create initial commit
git commit -m "feat: Initial Next.js migration and project setup

- Complete Next.js migration with 30 pages
- Set up App Router architecture
- Configure TypeScript and ESLint
- Add initial component structure
- Update dependencies and enhance SEO
- Upgrade to Next.js 15 and React 19
- Redesign homepage with enhanced light theme
- Add comprehensive documentation"

# Push new branch
git push origin main-clean

# Then make it the default branch in GitHub settings
```

## Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Examples:

```
feat(seo): Implement Entity-First SEO and GEO optimization

- Add Person schema generation for team members
- Implement FAQ schema for homepage and service pages
- Add content freshness tracking system
- Enhance E-E-A-T signals with credentials

Closes #123
```

```
fix(ui): Resolve theme transition flicker on homepage

- Update Framer Motion theme transitions
- Fix hydration mismatch in ThemeSwitcher
- Improve theme persistence

Fixes #456
```

## Verification

After cleanup, verify the history:

```bash
# View cleaned history
git log --oneline

# View detailed history
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit

# Check that all files are still present
git diff HEAD~1 --stat
```

## Safety Checklist

- [ ] Create a backup branch: `git branch backup-before-cleanup`
- [ ] Ensure all changes are committed or stashed
- [ ] Verify you're on the correct branch
- [ ] Test the rebase on a test branch first
- [ ] Inform team members if working collaboratively
- [ ] Have a rollback plan ready

## Rollback Plan

If something goes wrong:

```bash
# Abort the rebase
git rebase --abort

# Or reset to before the rebase
git reset --hard backup-before-cleanup

# Or use reflog to find the previous state
git reflog
git reset --hard HEAD@{n}  # where n is the commit before rebase
```


