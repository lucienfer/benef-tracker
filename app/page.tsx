import { Header } from "@/components/header";
import { ProgressChart } from "@/components/progress-chart";
import { getMembersForChart, getHistoryForChart } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const members = await getMembersForChart();
  const history = await getHistoryForChart();

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
          <ProgressChart members={members} history={history} />
        </div>
      </main>
    </div>
  );
}
