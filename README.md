# Frontend Setup Template

A production-ready Next.js template repository optimized for frontend development and deployment. This template comes pre-configured with TypeScript, Tailwind CSS v4.1, ESLint, and Prettier using Bun as the package manager.

## Features

- **Next.js 16** - Latest stable version with App Router
- **TypeScript 5.9+** - Strict mode enabled with proper type checking
- **Tailwind CSS v4.1** - Latest version with CSS-based configuration
- **ESLint** - Configured with Next.js and TypeScript rules, integrated with Prettier
- **Prettier** - Code formatter with Tailwind CSS class sorting
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint to check for code issues
- `bun lint:fix` - Run ESLint and automatically fix issues
- `bun format` - Format code with Prettier
- `bun format:check` - Check if code is formatted correctly

## Project Structure

```
frontend-setup-template/
├── app/                    # Next.js App Router directory
│   ├── globals.css        # Global styles with Tailwind CSS v4
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── public/                # Static assets
├── eslint.config.mjs      # ESLint configuration (v9 flat config)
├── prettier.config.ts     # Prettier configuration
├── postcss.config.mjs     # PostCSS configuration for Tailwind
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Configuration Details

### Tailwind CSS v4.1

This template uses Tailwind CSS v4.1 with the new CSS-based configuration:

- Uses `@import "tailwindcss"` in `app/globals.css`
- PostCSS plugin: `@tailwindcss/postcss`
- Theme customization via `@theme` blocks in CSS
- No `tailwind.config.js` needed (optional for advanced use cases)

### ESLint

- ESLint v9 with flat config format
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Integrated with Prettier via `eslint-config-prettier`

### Prettier

- Configured with `prettier-plugin-tailwindcss` for automatic class sorting
- Tailwind stylesheet path configured for v4 compatibility
- Single quotes, trailing commas, and consistent formatting

### TypeScript

- Strict mode enabled
- Includes `.next/types/**/*.ts` for auto-generated route types
- Path aliases configured (`@/*`)

## Customization

### Adding Components

Create reusable components in the `components/` directory:

```typescript
// components/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
}
```

### Customizing Tailwind Theme

Edit `app/globals.css` to customize your theme:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

### Environment Variables

Create a `.env.local` file for environment variables:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build

### Other Platforms

This template can be deployed to any platform that supports Next.js:

- [Netlify](https://www.netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app)
- [Docker](https://www.docker.com)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs) - Tailwind CSS v4 guide
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - TypeScript handbook
- [ESLint Documentation](https://eslint.org/docs) - ESLint configuration guide
- [Prettier Documentation](https://prettier.io/docs) - Prettier configuration options
- [Bun Documentation](https://bun.sh/docs) - Bun runtime and package manager

## License

This template is open source and available for use in your projects.
