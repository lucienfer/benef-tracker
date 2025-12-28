---
allowed-tools: Bash(git branch:*), Bash(git status:*), Bash(git checkout:*)
argument-hint: [message]
description: Create and checkout on a new branch
---

## Context

### Structure for the branch name

- `type`/`short-description`
  - **Type**: nature of the change
  - **description**: 2 to 4 to resume the action

- Type :
  - `feature/`
    - Description: Used for developing new features or functionality.
    - Example: `feature/login-page`

  - `bugfix/` (or `fix/`)
    - Description: Used for fixing non-critical bugs during the development phase.
    - Example: `bugfix/calendar-date-format`

  - `hotfix/`
    - Description: Used for critical, urgent fixes that need to be applied directly to production (bypassing standard dev cycles).
    - Example: `hotfix/security-patch-auth`

  - `chore/`
    - Description: Used for routine maintenance tasks that do not alter production code (e.g., updating dependencies, build configuration).
    - Example: `chore/update-react-version`

  - `refactor/`
    - Description: Used for code restructuring or cleanup that does not change external behavior (optimization, formatting).
    - Example: `refactor/simplify-user-controller`

  - `docs/`
    - Description: Used exclusively for additions or updates to documentation.
    - Example: `docs/update-readme`

  - `test/`
    - Description: Used for adding, updating, or fixing unit/integration tests.
    - Example: `test/add-payment-unit-tests`

  - `release/`
    - Description: Used for preparing a new production release (code freeze, version bumping, release notes).
    - Example: `release/v1.2.0`

### Exemple

| bad name      | good name                    |
| ------------- | ---------------------------- |
| `UserProfile` | `feature/user-profile-page`  |
| `fix`         | `bugfix/fix-mobile-menu`     |
| `tests`       | `test/add-integration-tests` |

### Bash command

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the message subject, create a single branch with appropriate name and checkout in it.
