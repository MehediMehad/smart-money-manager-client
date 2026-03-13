import { Badge } from "@/components/ui/badge";

function formatBDT(amount: number) {
  return "৳" + Math.abs(amount).toLocaleString("bn-BD");
}

function getStatus(spent: number, budget: number) {
  const percent = (spent / budget) * 100;
  if (percent > 100) return "over";
  if (percent > 80) return "near";
  return "safe";
}

function getStatusBadge(status: string) {
  if (status === "over") return <Badge variant="destructive"> Over </Badge>;
  if (status === "near")
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-700">
        Near
      </Badge>
    );
  return <Badge variant="secondary"> Safe </Badge>;
}

export { formatBDT, getStatus, getStatusBadge };
