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
} from "@/components/ui/dialog";
import { acceptChallenge } from "@/app/actions/challenge";
import { GOAL_AMOUNT } from "@/types/member";

interface ChallengeAcceptModalProps {
  open: boolean;
  userName?: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function ChallengeAcceptModal({
  open,
  userName,
}: ChallengeAcceptModalProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isPending, startTransition] = useTransition();
  const currentYear = new Date().getFullYear();

  const handleAccept = () => {
    startTransition(async () => {
      await acceptChallenge();
      setIsOpen(false);
    });
  };

  const handleDecline = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-[450px]">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 text-6xl">🏆</div>
          <DialogTitle className="text-2xl">
            {userName ? `Hey ${userName} !` : "Bienvenue !"}
          </DialogTitle>
          <DialogDescription className="text-base">
            Le challenge {currentYear} est lance !
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="mb-2 text-sm text-muted-foreground">Objectif</p>
            <p className="text-3xl font-bold text-foreground">
              {formatCurrency(GOAL_AMOUNT)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              de profits avant le 31 decembre
            </p>
          </div>

          <div className="rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="mb-1 text-sm font-semibold text-destructive">
              ⚠️ Attention !
            </p>
            <p className="text-sm text-muted-foreground">
              Si tu n&apos;atteins pas l&apos;objectif, ta mere sera{" "}
              <span className="font-bold text-foreground">une pute</span> 💃
            </p>
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
            onClick={handleDecline}
            className="w-full text-muted-foreground"
          >
            Peut-etre plus tard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
