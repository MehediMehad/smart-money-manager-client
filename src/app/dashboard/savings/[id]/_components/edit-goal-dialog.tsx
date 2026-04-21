"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateSavingsGoal } from "../../_actions";

type Props = {
  goalId: string;
  goalName: string;
  targetAmount: number;
  deadline: string;
  disabled?: boolean;
};

function toDateInputValue(date: string) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function EditGoalDialog({
  goalId,
  goalName,
  targetAmount,
  deadline,
  disabled = false,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const defaultDeadline = useMemo(() => toDateInputValue(deadline), [deadline]);

  async function handleSubmit(formData: FormData) {
    const payload = {
      name: String(formData.get("name") || "").trim(),
      targetAmount: Number(formData.get("targetAmount") || 0),
      deadline: String(formData.get("deadline") || ""),
    };

    startTransition(async () => {
      const result = await updateSavingsGoal(goalId, payload);

      if (result.success) {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Pencil className="h-4 w-4" />
          Edit Goal
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Savings Goal</DialogTitle>
          <DialogDescription>
            Update goal name, target amount, or deadline.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={goalName}
              placeholder="e.g. Buy Mouse"
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
              defaultValue={targetAmount}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              defaultValue={defaultDeadline}
              required
            />
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
            <Button
              variant="outline"
              className="w-full gap-2"
              disabled={disabled}
            >
              <Pencil className="h-4 w-4" />
              Edit Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
