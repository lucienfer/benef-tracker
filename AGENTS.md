# AI Agents Documentation

This document provides comprehensive information about AI agents used in this project and guidelines for AI agents working on this codebase.

## Overview

This project utilizes AI agents (specifically Claude/Cursor) to assist with development tasks. The AI agents are configured through the `.claude` directory and follow specific coding guidelines and workflows to ensure consistent, high-quality code contributions.

### Purpose

- **Documentation**: Understand how AI agents are configured and used in this project
- **Guidelines**: Provide clear instructions for AI agents when working on this codebase
- **Workflows**: Define standard processes for AI-assisted development tasks

## Configuration

### Directory Structure

The AI agent configuration is located in the `.claude` directory:

```
.claude/
├── commands/          # AI agent commands and workflows
│   └── pr.md         # Pull request related commands
└── rules/            # Coding rules and guidelines
    └── typescript-code-quality.mdc
```

### Rules

Coding rules are defined in `.claude/rules/typescript-code-quality.mdc` and are automatically applied to all AI agent interactions. These rules enforce:

- Code quality standards
- TypeScript best practices
- Consistent coding patterns
- Minimal code changes principle

### Commands

Custom commands for AI agents are stored in `.claude/commands/`. These commands can be invoked to perform specific tasks or workflows.

## Available Commands

Commands available to AI agents working on this project:

### Pull Request Commands

- **PR Creation**: Use commands in `.claude/commands/pr.md` for pull request workflows

_Note: Additional commands may be added to the `.claude/commands/` directory as needed._

## Coding Guidelines

AI agents working on this codebase must follow these guidelines:

### Core Principles

1. **Simplicity**: Write simple and straightforward code
2. **Readability**: Ensure code is easy to read and understand
3. **Performance**: Keep performance in mind without over-optimizing
4. **Maintainability**: Write code that is easy to maintain and update
5. **Testability**: Ensure code is easy to test
6. **Reusability**: Write reusable components and functions

### Code Style

- **Early Returns**: Use early returns to avoid nested conditions
- **Conditional Classes**: Prefer conditional classes over ternary operators for class attributes
- **Descriptive Names**: Use descriptive names for variables and functions
  - Prefix event handler functions with "handle" (e.g., `handleClick`, `handleKeyDown`)
- **Constants Over Functions**: Use constants instead of functions where possible
- **DRY Principle**: Don't Repeat Yourself - focus on correct, best practice, DRY code
- **Functional Style**: Prefer functional, immutable style unless it becomes much more verbose

### Documentation

- **Function Comments**: Add a comment at the start of each function describing what it does
- **JSDoc Comments**: Use JSDoc comments for JavaScript (unless it's TypeScript) and modern ES6 syntax

### Function Ordering

Order functions with those that compose other functions appearing earlier in the file. For example, if you have a menu with multiple buttons, define the menu function above the buttons.

### Minimal Code Changes

**Critical Principle**: Only modify sections of the code related to the task at hand.

- Avoid modifying unrelated pieces of code
- Avoid changing existing comments
- Avoid any kind of cleanup unless specifically instructed
- Accomplish goals with the minimum amount of code changes
- Remember: Code change = potential for bugs and technical debt

### Bug Handling

If you encounter a bug in existing code, or instructions lead to suboptimal or buggy code, add comments starting with "TODO:" outlining the problems.

## Workflow Instructions

### Task Approach

When working on tasks, AI agents should:

1. **Understand First**: Read and understand the existing codebase structure
2. **Plan**: Outline a detailed pseudocode plan step by step using Chain of Thought method
3. **Confirm**: Confirm the plan before proceeding
4. **Implement**: Write code following the guidelines above
5. **Verify**: Ensure changes are minimal and focused

### Code Review Guidelines

- Review changes for adherence to coding guidelines
- Ensure minimal code changes
- Verify that unrelated code hasn't been modified
- Check that new code follows project conventions

### Modification Guidelines

- **Scope**: Only modify code directly related to the requested task
- **Comments**: Preserve existing comments unless they're directly related to changes
- **Formatting**: Maintain existing code formatting unless specifically asked to reformat
- **Structure**: Don't refactor or restructure code unless explicitly requested

### Quality Assurance

- Ensure code follows TypeScript strict mode requirements
- Verify code passes ESLint checks
- Confirm code formatting matches Prettier configuration
- Test that changes don't break existing functionality

## Project-Specific Context

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9+ (strict mode enabled)
- **Styling**: Tailwind CSS v4.1 (CSS-based configuration)
- **Package Manager**: Bun
- **Linting**: ESLint v9 (flat config format)
- **Formatting**: Prettier with Tailwind CSS class sorting

### Key Conventions

- **File Structure**: Follow Next.js App Router conventions
- **Components**: Place reusable components in the `components/` directory
- **Styling**: Use Tailwind CSS utility classes
- **Type Safety**: Leverage TypeScript strict mode for type safety
- **Imports**: Use path aliases (`@/*`) for imports

### Configuration Files

- `eslint.config.mjs` - ESLint configuration (v9 flat config)
- `prettier.config.ts` - Prettier configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

### Development Commands

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint issues
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting

## Best Practices

### When Adding New Features

1. Create components in the `components/` directory
2. Use TypeScript for type safety
3. Follow Tailwind CSS utility-first approach
4. Write clean, readable code
5. Add appropriate comments and documentation

### When Fixing Bugs

1. Identify the root cause
2. Make minimal changes to fix the issue
3. Add TODO comments if the fix is temporary or suboptimal
4. Ensure the fix doesn't break existing functionality

### When Refactoring

1. Only refactor when explicitly requested
2. Maintain existing functionality
3. Follow the same coding guidelines
4. Update related documentation if needed

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ESLint Documentation](https://eslint.org/docs)
- [Prettier Documentation](https://prettier.io/docs)
- [Bun Documentation](https://bun.sh/docs)
