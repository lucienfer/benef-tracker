import { Header } from "@/components/header";
import { ProgressChart } from "@/components/progress-chart";
import { ChallengeStats } from "@/components/challenge-stats";
import { ChallengeAcceptModal } from "@/components/challenge-accept-modal";
import {
  getMembersForChart,
  getHistoryForChart,
  getCurrentUserMember,
} from "@/lib/data";
import { hasAcceptedChallenge } from "@/app/actions/challenge";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const members = await getMembersForChart();
  const history = await getHistoryForChart();
  const currentUserMember = user ? await getCurrentUserMember() : null;

  // Check if logged-in user needs to accept the challenge
  const showChallengeModal = user ? !(await hasAcceptedChallenge()) : false;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Challenge Progress
          </h2>
          <p className="text-muted-foreground">
            Qui arrivera a gagner 100k avant le 31 decembre ?
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <ProgressChart members={members} history={history} />
        </div>

        <ChallengeStats
          isLoggedIn={!!user}
          currentAmount={currentUserMember?.currentBenefit}
        />
      </main>

      {showChallengeModal && (
        <ChallengeAcceptModal open={true} userName={currentUserMember?.name} />
      )}
    </div>
  );
}
