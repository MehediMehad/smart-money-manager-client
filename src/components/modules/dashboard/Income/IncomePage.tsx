"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Filter } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { TDashboardSummary } from "@/services/Income";
import StatCard from "./StatCard";
import Charts from "./Charts";
import FinancialInsight from "./FinancialInsight";
import SourceSummary from "./SourceSummary";

type Props = {
  summary: TDashboardSummary;
};

export default function IncomePage({ summary }: Props) {
  const [openAdd, setOpenAdd] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchNote, setSearchNote] = useState("");

  // Use real data from backend
  const {
    totalThisMonth,
    todayIncome,
    avgDaily,
    mainSource,
    sourceSummary,
    monthlyTrend,
    incomes,
  } = summary;

  // Filter incomes for the table
  const filteredIncomes = useMemo(() => {
    return incomes.filter((item) => {
      const matchSource =
        sourceFilter === "all" || item.source === sourceFilter;
      const matchNote =
        !searchNote ||
        item.note.toLowerCase().includes(searchNote.toLowerCase());
      return matchSource && matchNote;
    });
  }, [incomes, sourceFilter, searchNote]);

  return (
    <div className="min-h-screen pb-24 md:pb-12 space-y-6">
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income This Month"
          value={totalThisMonth}
          subtitle="March 2026"
          variant="emerald"
        />
        <StatCard
          title="Today's Income"
          value={todayIncome}
          subtitle={new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          variant="blue"
        />
        <StatCard
          title="Average Daily Income"
          value={avgDaily}
          subtitle="This Month"
          variant="emerald"
        />
        <StatCard
          title="Main Source"
          value={mainSource.value}
          subtitle={mainSource.name}
          variant="purple"
        />
      </div>

      {/* 2. Charts */}
      <Charts sourceSummary={sourceSummary} monthlyTrend={monthlyTrend} />

      {/* Financial Insight Section */}
      <FinancialInsight
        totalThisMonth={totalThisMonth}
        mainSource={mainSource}
      />

      {/* Filters + Add Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-3 md:static md:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-muted/40">
              <Filter className="h-4 w-4" />
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="border-0 bg-transparent shadow-none h-7 min-w-[140px] p-0">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sourceSummary.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Search by note..."
              className="max-w-[240px] h-10"
              value={searchNote}
              onChange={(e) => setSearchNote(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setOpenAdd(true)}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 sm:w-auto w-full"
          >
            <Plus className="h-4 w-4" /> Add New Income
          </Button>
        </div>
      </div>

      {/* Income History Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncomes.length > 0 ? (
              filteredIncomes.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background">
                      {item.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.note || "—"}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-emerald-600">
                    {item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No incomes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Source Summary */}
      <SourceSummary
        sourceSummary={sourceSummary}
        totalThisMonth={totalThisMonth}
      />

      {/* Add Income Modal */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Income</DialogTitle>
            <DialogDescription>
              Enter the details correctly and save
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Income Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {sourceSummary.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Amount (৳)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid gap-2">
              <Label>Note (Optional)</Label>
              <Textarea placeholder="Add more details..." rows={3} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Save Income
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
