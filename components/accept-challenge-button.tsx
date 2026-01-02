"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { acceptChallenge } from "@/app/actions/challenge";
import { GOAL_AMOUNT } from "@/types/member";
import { Trophy } from "lucide-react";

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function AcceptChallengeButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentYear = new Date().getFullYear();

  const handleAccept = () => {
    startTransition(async () => {
      await acceptChallenge();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Trophy className="size-4" />
          Accept Challenge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 text-6xl">🏆</div>
          <DialogTitle className="text-2xl">
            Rejoins le challenge {currentYear} !
          </DialogTitle>
          <DialogDescription className="text-base">
            Es-tu pret a relever le defi ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="mb-2 text-sm text-muted-foreground">Objectif</p>
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(GOAL_AMOUNT)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              de profits DeFi avant le 31 decembre
            </p>
          </div>

          <div className="rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="mb-1 text-sm font-semibold text-destructive">
              ⚠️ Attention - Gage en cas d&apos;echec !
            </p>
            <p className="text-sm text-muted-foreground">
              Si tu n&apos;atteins pas l&apos;objectif, tu devras offrir un{" "}
              <span className="font-bold text-foreground">
                resto a tous les gagnants
              </span>{" "}
              🍽️
            </p>
          </div>

          <div className="space-y-2 text-center text-sm text-muted-foreground">
            <p>🎯 Suis ta progression en temps reel</p>
            <p>📊 Compare-toi aux autres participants</p>
            <p>💰 Gagne ou paie l&apos;addition !</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleAccept}
            disabled={isPending}
            className="w-full text-lg"
            size="lg"
          >
            {isPending ? "..." : "J'accepte le challenge ! 🚀"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="w-full text-muted-foreground"
          >
            Pas maintenant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
