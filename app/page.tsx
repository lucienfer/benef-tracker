import { Header } from "@/components/header";
import { ProgressChart } from "@/components/progress-chart";
import { getMembersForChart, getHistoryForChart } from "@/lib/data";
import { mockMembers, mockHistory } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Try to fetch from database, fall back to mock data
  let members = await getMembersForChart();
  let history = await getHistoryForChart();

  // Use mock data if database is empty or not configured
  if (members.length === 0) {
    members = mockMembers;
    history = mockHistory;
  }

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
