import { Button } from "@/components/ui/button";
import { ProgressChart } from "@/components/progress-chart";
import { mockMembers, mockHistory } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            RoadTo100k
          </h1>
          <Button variant="outline">Connect Wallet</Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Challenge Progress
          </h2>
          <p className="text-muted-foreground">
            Track who reaches $100k in DeFi profits first
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <ProgressChart members={mockMembers} history={mockHistory} />
        </div>
      </main>
    </div>
  );
}
