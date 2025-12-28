/**
 * Home page component displaying the project title and description.
 * Serves as the landing page for the frontend setup template with centered layout.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full max-w-2xl px-8 py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-6xl font-semibold tracking-tight text-foreground">
            frontend-setup-template
          </h1>
          <div className="h-px w-24 bg-gray-300" />
          <p className="max-w-lg text-lg leading-relaxed text-foreground/70">
            A production-ready Next.js template optimized for frontend
            development. Pre-configured with TypeScript, Tailwind CSS v4,
            ESLint, and Prettier using Bun as the package manager.
          </p>
        </div>
      </main>
    </div>
  );
}
