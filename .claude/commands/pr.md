---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(gh pr create:*), Bash(git log main..HEAD)
argument-hint: [message]
description: Write a GitHub Pull Request Title and Description.
---

# GitHub CLI Pull Request Creation Guide

This guide provides comprehensive instructions for creating pull requests using GitHub CLI.

## Prerequisites

- Installing GitHub CLI
- Authenticating with GitHub

## Requirements:

- **Title**: Must follow the format `[TYPE] Imperative description (#TicketID)`.
  Determine the Ticket ID from the branch name if present.
  Types allowed: feat, fix, chore, refactor, docs, test, ci.

- **Body**: Use the exact Markdown template below. Fill in the sections based on the code analysis.
  Be concise but professional.
  In "Type of Change", mark the correct box with `[x]`.
  In "Description", explain why and what changed.

## Template to use

```
## 🎫 Related Ticket(s)
- Issue: #[Issue Number]

## 📄 Description
This PR introduces [feature/fix] that allows...

## 🛠️ Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 🔧 Chore (maintenance, configuration, refactoring)
- [ ] 📝 Documentation update

## 🧪 How Has This Been Tested?
- [ ] Unit Tests
- [ ] Manual Testing in [Browser/Device]
- [ ] Integration Tests

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## ✅ Checklist:
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## Bash commands

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`
- Create pr: !`gh pr create --title [the title of the pr] --body-file [the body of the pr] --base [the branch to merge the pr]

## More detail

- Use all commands to have the more information of the pr.
- Check the format and lint.
- If they have test, test the code.
