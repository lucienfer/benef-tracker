# Frontend Setup Template

## Overview

A production-ready Next.js template repository optimized for frontend development and deployment. This template provides a modern development stack with TypeScript, Tailwind CSS v4.1, ESLint, and Prettier, using Bun as the package manager. The template includes AI agent configuration via `.claude` and `.cursor` directories for enhanced development workflows.

**Version**: 0.1.0
**Framework**: Next.js 16.0.7
**Runtime**: Bun
**Last Updated**: 2025-12-04

## Architecture

### Technology Stack

- **Next.js 16.0.7** - App Router architecture with server and client components
- **React 19.2.0** - Latest React with improved performance and new features
- **TypeScript 5.9+** - Strict mode enabled for comprehensive type safety
- **Tailwind CSS v4.1** - CSS-based configuration using `@theme` blocks
- **Bun** - Fast JavaScript runtime and package manager
- **ESLint 9** - Flat config format with Next.js and GitHub plugin rules
- **Prettier 3.7** - Code formatter with Tailwind CSS class sorting plugin

### Key Architectural Decisions

1. **App Router**: Uses Next.js App Router for modern routing and layouts
2. **TypeScript Strict Mode**: Enforces strict type checking across the codebase
3. **CSS-First Styling**: Tailwind v4 with CSS-based theme configuration
4. **Font Optimization**: Custom GeneralSans font family with multiple weights
5. **AI-Assisted Development**: Pre-configured with Claude and Cursor rules

### Design System

- **Typography**: GeneralSans font family (Extralight to Bold, with italics)
- **Color Scheme**: Light mode by default with dark mode support via `prefers-color-scheme`
  - Background: `#f8f8f8` (light) / `#0a0a0a` (dark)
  - Foreground: `#1a1a1a` (light) / `#ededed` (dark)
  - Accent: `#3a7bd5`
  - Border: `#e2e2e2`

## Setup & Installation

### Prerequisites

- [Bun](https://bun.sh) installed on your system (latest version recommended)

### Installation Steps

1. Clone this repository or use it as a template:

```bash
git clone <repository-url>
cd frontend-setup-template
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
# Add other environment variables as needed
```

## Development Workflow

### Available Scripts

- `bun dev` - Start Next.js development server with hot reload
- `bun build` - Build optimized production bundle
- `bun start` - Start production server (requires build first)
- `bun lint` - Run ESLint to check for code issues
- `bun lint:fix` - Run ESLint and automatically fix fixable issues
- `bun format` - Format all code with Prettier
- `bun format:check` - Check if code is formatted correctly (CI-friendly)

### Git Workflow

- **Main Branch**: `main` - Production-ready code
- **CI/CD**: GitHub Actions workflow configured for lint and format checks on push/PR
- See `.github/workflows/ci.yml` for CI configuration

### Code Quality Tools

1. **ESLint**: Configured with Next.js core web vitals and GitHub plugin rules
2. **Prettier**: Automatic code formatting with Tailwind class sorting
3. **TypeScript**: Strict mode catches potential issues at compile time
4. **GitHub Actions**: Automated lint and format checks on all PRs

## File Structure

```
frontend-setup-template/
├── .claude/                    # Claude AI agent configuration
│   ├── commands/              # Custom AI commands
│   │   └── pr.md             # Pull request commands
│   └── rules/                # AI coding rules
│       └── typescript-code-quality.mdc
├── .cursor/                   # Cursor AI editor configuration
│   └── rules/                # Cursor-specific rules
│       └── typescript-code-quality.mdc
├── .github/                   # GitHub configuration
│   └── workflows/            # CI/CD workflows
│       └── ci.yml           # Lint and format checks
├── app/                      # Next.js App Router directory
│   ├── favicon.ico          # Site favicon
│   ├── globals.css          # Global styles with Tailwind v4
│   ├── layout.tsx           # Root layout with font configuration
│   └── page.tsx             # Home page component
├── components/               # Reusable React components (create as needed)
├── public/                   # Static assets
│   ├── fonts/               # GeneralSans font family (.otf files)
│   └── *.svg                # SVG icons
├── AGENTS.md                 # AI agent documentation and guidelines
├── CLAUDE.md                 # This file - project documentation
├── README.md                 # Project overview and quick start
├── eslint.config.mjs         # ESLint v9 flat config
├── prettier.config.ts        # Prettier configuration
├── postcss.config.mjs        # PostCSS with Tailwind plugin
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

### Key Files

- **AGENTS.md**: Comprehensive documentation for AI agents working on this codebase, includes coding guidelines, workflow instructions, and project context
- **CLAUDE.md**: Project documentation for developers (this file)
- **.claude/rules/**: TypeScript code quality rules enforced by AI agents
- **app/layout.tsx**: Root layout with font loading and metadata configuration
- **app/globals.css**: Tailwind v4 imports and theme customization

## Development Guidelines

### Adding New Features

1. **Components**: Create reusable components in `components/` directory
2. **Pages**: Add new pages in `app/` following App Router conventions
3. **Styles**: Use Tailwind utility classes, extend theme in `app/globals.css` if needed
4. **Types**: Leverage TypeScript strict mode for type safety
5. **Imports**: Use `@/*` path alias for cleaner imports

### Styling with Tailwind v4

The project uses Tailwind CSS v4 with CSS-based configuration:

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --color-custom: #hexvalue;
  --font-custom: "Font Name", sans-serif;
}
```

- No `tailwind.config.js` required (optional for advanced cases)
- Theme customization via CSS custom properties
- Automatic dark mode via `@media (prefers-color-scheme: dark)`

### Working with AI Agents

This project is configured for AI-assisted development:

- Review **AGENTS.md** for detailed AI agent guidelines
- Follow the minimal code changes principle
- Use early returns and descriptive function names
- Add comments describing function purposes
- AI agents enforce rules from `.claude/rules/typescript-code-quality.mdc`

## CI/CD

### GitHub Actions

The project includes a CI workflow (`.github/workflows/ci.yml`) that runs on push and pull requests to main:

- **Lint Check**: Validates code against ESLint rules
- **Format Check**: Ensures code follows Prettier formatting
- **Node Version**: Uses LTS version for consistent builds
- **Dependency Installation**: Uses `npm ci` for deterministic installs

### Pre-Deployment Checklist

- [ ] Run `bun lint` and fix all issues
- [ ] Run `bun format` to ensure consistent formatting
- [ ] Run `bun build` successfully
- [ ] Test in production mode with `bun start`
- [ ] Verify environment variables are configured
- [ ] Update documentation for new features

## Recent Updates (Updated: 2025-12-04)

### Latest Changes

**Commit 36b3bf7** (41 minutes ago) - AI Agent Configuration

- Added `.claude/` directory with commands and rules
- Added `.cursor/` directory with TypeScript code quality rules
- Created **AGENTS.md** with comprehensive AI agent documentation
- Created **CLAUDE.md** (this file) for project documentation
- Added GitHub Actions CI workflow for lint and format checks

**Commit e1ff6e4** (2 hours ago) - Design System Update

- Added GeneralSans font family with 12 weight variants
- Updated home page with minimalist centered design
- Implemented custom color scheme with CSS variables
- Added dark mode support via `prefers-color-scheme`
- Simplified layout component with font optimization

**Commit 9ee9046** (3 hours ago) - ESLint Setup

- Configured ESLint v9 with flat config format
- Added Next.js core web vitals and TypeScript rules
- Integrated Prettier with ESLint
- Added GitHub ESLint plugin for best practices
- Updated lint scripts in package.json

**Commit c697852** (4 hours ago) - Initial Setup

- Initialized Next.js 16 project with TypeScript
- Configured Tailwind CSS v4.1 with PostCSS
- Set up Prettier with Tailwind plugin
- Created basic project structure
- Added comprehensive README documentation

### Breaking Changes

None - this is the initial release.

### New Features

1. **AI Development Support**: Full configuration for Claude and Cursor AI agents
2. **Custom Typography**: GeneralSans font family across all weights
3. **Modern Styling**: Tailwind CSS v4 with CSS-based theme configuration
4. **Automated Quality Checks**: CI workflow for linting and formatting
5. **Dark Mode**: Automatic dark mode based on system preferences

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js configuration
4. Configure environment variables in Vercel dashboard
5. Deploy

### Other Platforms

Compatible with any platform supporting Next.js:

- [Netlify](https://www.netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app)
- Docker containers

### Build Configuration

- **Build Command**: `bun build`
- **Output Directory**: `.next`
- **Install Command**: `bun install`
- **Node Version**: LTS (recommended)

## Important Notes

### For Developers

1. **Bun Required**: This project uses Bun as the package manager. Install from [bun.sh](https://bun.sh)
2. **AI Agents**: Read **AGENTS.md** before having AI agents modify code
3. **Minimal Changes**: Follow the principle of minimal code changes to reduce bugs
4. **TypeScript Strict**: All code must pass TypeScript strict mode checks
5. **Format Before Commit**: Run `bun format` before committing code

### For AI Agents

- **Read AGENTS.md first**: Contains critical guidelines and workflows
- **Follow minimal changes principle**: Only modify code related to the task
- **Use TypeScript strictly**: Leverage strict mode for type safety
- **Preserve comments**: Don't modify unrelated comments
- **Early returns**: Prefer early returns over nested conditions
- **Descriptive names**: Use clear, descriptive variable and function names

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ESLint Documentation](https://eslint.org/docs)
- [Prettier Documentation](https://prettier.io/docs)
- [Bun Documentation](https://bun.sh/docs)

## Support

For issues or questions:

- Check the [README.md](./README.md) for quick start guide
- Review [AGENTS.md](./AGENTS.md) for AI development guidelines
- Open an issue on GitHub for bugs or feature requests

---

**Template maintained by**: Zetis Labs
**License**: Open source - available for use in your projects
