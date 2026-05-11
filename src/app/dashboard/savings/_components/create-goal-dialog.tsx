"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { createSavingsGoal } from "../_actions";

export function CreateGoalDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const payload = {
      name: String(formData.get("name") || ""),
      targetAmount: Number(formData.get("targetAmount") || 0),
      deadline: String(formData.get("deadline") || ""),
    };

    startTransition(async () => {
      const result = await createSavingsGoal(payload);

      if (result.success) {
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-emerald-700 to-teal-600"
          >
            <Plus className="h-4 w-4" />
            New Goal
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
            <DialogDescription>
              Plan your next financial target
            </DialogDescription>
          </DialogHeader>

          <form action={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Buy Laptop"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="targetAmount">Target Amount (৳)</Label>
              <Input
                id="targetAmount"
                name="targetAmount"
                type="number"
                min={1}
                placeholder="80000"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" name="deadline" type="date" required />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Goal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 shadow-2xl"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </>
  );
}
