import { createClient } from "@/lib/supabase/server";
import { ConnectButton } from "./connect-button";
import { AddBenefitButton } from "./add-benefit-button";
import { AcceptChallengeButton } from "./accept-challenge-button";
import { hasAcceptedChallenge } from "@/app/actions/challenge";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasAccepted = user ? await hasAcceptedChallenge() : false;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          RoadTo100k
        </h1>
        <div className="flex items-center gap-3">
          {user &&
            (hasAccepted ? <AddBenefitButton /> : <AcceptChallengeButton />)}
          <ConnectButton user={user} />
        </div>
      </div>
    </header>
  );
}
