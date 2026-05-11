// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { CalendarIcon, Pencil, Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { cn } from "@/lib/utils";
// import { MonthPicker } from "@/components/shared/core/MonthPicker";
// import { budgetSchema, BudgetFormValues } from "@/validations/budgetValidation";
// import { TCategory } from "@/types";
// import { createBudget, updateBudget } from "@/services/Budget";

// type Props = {
//   mode: "create" | "edit";
//   budget?: any;
//   isIcon?: boolean;
//   onSuccess?: () => void;
//   categories: TCategory[];
// };

// export default function BudgetFormModal({
//   mode,
//   budget,
//   isIcon,
//   onSuccess,
//   categories,
// }: Props) {
//   const isEdit = mode === "edit";
//   const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");

//   const [open, setOpen] = useState(false);
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [monthPickerOpen, setMonthPickerOpen] = useState(false);

//   const amountInputRef = useRef<HTMLInputElement>(null);

//   const today = new Date();
//   const todayDate = format(today, "yyyy-MM-dd");
//   const currentMonth = format(today, "yyyy-MM");

//   const getDefaultValues = (): BudgetFormValues => {
//     if (isEdit) {
//       return {
//         type: budget?.type ?? "DAILY",
//         date: budget?.date ?? "",
//         month: budget?.month ?? "",
//         amount: budget?.amount ? String(budget.amount) : "",
//         categoryId: budget?.categoryId ?? "",
//       };
//     }

//     return {
//       type: "DAILY",
//       date: todayDate,
//       month: "",
//       amount: "",
//       categoryId: "",
//     };
//   };

//   const form = useForm<BudgetFormValues>({
//     resolver: zodResolver(budgetSchema),
//     defaultValues: getDefaultValues(),
//   });

//   const {
//     watch,
//     setValue,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = form;

//   const selectedType = watch("type");
//   const selectedCategoryId = watch("categoryId");
//   const selectedCategory = expenseCategories.find(
//     (cat) => cat.id === selectedCategoryId,
//   );

//   useEffect(() => {
//     if (!open) return;
//     reset(getDefaultValues());
//   }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

//   const handleTypeChange = (value: "DAILY" | "MONTHLY") => {
//     setValue("type", value, { shouldValidate: true });

//     if (value === "DAILY") {
//       setValue("date", watch("date") || todayDate, { shouldValidate: true });
//       setValue("month", "", { shouldValidate: true });
//       setMonthPickerOpen(false);
//     } else {
//       setValue("month", watch("month") || currentMonth, {
//         shouldValidate: true,
//       });
//       setValue("date", "", { shouldValidate: true });
//       setDatePickerOpen(false);
//     }
//   };

//   const handleCancel = () => {
//     reset(getDefaultValues());
//     setDatePickerOpen(false);
//     setMonthPickerOpen(false);
//     setOpen(false);
//   };

//   const onSubmit = async (values: BudgetFormValues) => {
//     try {
//       let result;

//       result = await createBudget({
//         categoryId: values.categoryId,
//         amount: Number(values.amount),
//         type: values.type,
//         date: values.date || undefined,
//         month: values.month || undefined,
//       });

//       if (!result.success) {
//         throw new Error(result.message);
//       }

//       toast.success(
//         isEdit ? "Budget updated successfully" : "Budget created successfully",
//       );

//       reset(getDefaultValues());
//       setDatePickerOpen(false);
//       setMonthPickerOpen(false);
//       setOpen(false);

//       onSuccess?.();
//     } catch (err: any) {
//       console.error(err);
//       toast.error(
//         err?.message || `Failed to ${isEdit ? "update" : "create"} budget`,
//       );
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         {isIcon ? (
//           <Button
//             size="icon"
//             className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
//           >
//             <Plus className="h-7 w-7" />
//           </Button>
//         ) : isEdit ? (
//           <Button
//             variant="ghost"
//             size="icon"
//             className="text-primary hover:text-primary/80"
//           >
//             <Pencil className="h-4 w-4" />
//           </Button>
//         ) : (
//           <Button className="gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700">
//             <Plus className="h-4 w-4" />
//             Add Budget
//           </Button>
//         )}
//       </DialogTrigger>

//       <DialogContent className="max-w-[90%] md:max-w-xl rounded-2xl">
//         <DialogHeader>
//           <DialogTitle>
//             {isEdit ? "Edit Budget" : "Create New Budget"}
//           </DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
//             <FormField
//               control={form.control}
//               name="type"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Type</FormLabel>

//                   <Select
//                     value={field.value}
//                     onValueChange={(value: "DAILY" | "MONTHLY") =>
//                       handleTypeChange(value)
//                     }
//                   >
//                     <FormControl>
//                       <SelectTrigger className="py-5">
//                         <SelectValue placeholder="Select budget type" />
//                       </SelectTrigger>
//                     </FormControl>

//                     <SelectContent>
//                       <SelectItem value="DAILY">Daily</SelectItem>
//                       <SelectItem value="MONTHLY">Monthly</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name={selectedType === "DAILY" ? "date" : "month"}
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="mb-1">
//                     {selectedType === "DAILY" ? "Select Date" : "Select Month"}
//                   </FormLabel>

//                   {selectedType === "DAILY" ? (
//                     <Popover
//                       open={datePickerOpen}
//                       onOpenChange={setDatePickerOpen}
//                       modal
//                     >
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             className={cn(
//                               "w-full justify-start py-5 text-left font-normal",
//                               !field.value && "text-muted-foreground",
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value
//                               ? format(new Date(field.value), "dd MMMM yyyy")
//                               : "Pick a date"}
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>

//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={
//                             field.value ? new Date(field.value) : undefined
//                           }
//                           onSelect={(date) => {
//                             if (!date) return;
//                             field.onChange(format(date, "yyyy-MM-dd"));
//                             setDatePickerOpen(false);
//                           }}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   ) : (
//                     <Popover
//                       open={monthPickerOpen}
//                       onOpenChange={setMonthPickerOpen}
//                       modal
//                     >
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             className={cn(
//                               "w-full justify-start py-5 text-left font-normal",
//                               !field.value && "text-muted-foreground",
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value
//                               ? format(
//                                   new Date(`${field.value}-01`),
//                                   "MMMM yyyy",
//                                 )
//                               : "Pick a month"}
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>

//                       <PopoverContent className="w-auto py-5" align="start">
//                         <MonthPicker
//                           selectedMonth={
//                             field.value
//                               ? new Date(`${field.value}-01`)
//                               : undefined
//                           }
//                           onMonthChange={(date) => {
//                             if (!date) return;
//                             field.onChange(format(date, "yyyy-MM"));
//                             setMonthPickerOpen(false);
//                           }}
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   )}

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="amount"
//               render={({ field }) => (
//                 <FormItem className="!mt-3">
//                   <FormLabel>Amount</FormLabel>
//                   <FormControl>
//                     <Input
//                       className="py-5"
//                       type="number"
//                       placeholder="e.g. 1500"
//                       {...field}
//                       ref={(e) => {
//                         field.ref(e);
//                         amountInputRef.current = e;
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>

//                   <div className="max-h-72 overflow-y-auto -mx-1 px-1">
//                     {expenseCategories.length === 0 ? (
//                       <p className="text-center text-sm text-muted-foreground py-4">
//                         No expense categories available
//                       </p>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {expenseCategories.map((cat) => (
//                           <button
//                             key={cat.id}
//                             type="button"
//                             onClick={() => {
//                               field.onChange(cat.id);
//                               setTimeout(
//                                 () => amountInputRef.current?.focus(),
//                                 80,
//                               );
//                             }}
//                             className={cn(
//                               "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
//                               "border hover:bg-primary/10 hover:text-primary hover:border-primary/40",
//                               field.value === cat.id
//                                 ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
//                                 : "text-muted-foreground border-transparent",
//                             )}
//                           >
//                             <span className="text-base">{cat.emoji}</span>
//                             {cat.name}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <FormMessage />

//                   {selectedCategory && (
//                     <p className="text-xs text-muted-foreground mt-1.5 text-center">
//                       Selected: {selectedCategory.emoji} {selectedCategory.name}
//                     </p>
//                   )}
//                 </FormItem>
//               )}
//             />

//             <DialogFooter className="flex-col sm:flex-row gap-3 pt-2">
//               <Button type="button" variant="outline" onClick={handleCancel}>
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
//               >
//                 {isSubmitting
//                   ? isEdit
//                     ? "Updating..."
//                     : "Creating..."
//                   : isEdit
//                     ? "Update Budget"
//                     : "Create Budget"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { MonthPicker } from "@/components/shared/core/MonthPicker";
import { budgetSchema, BudgetFormValues } from "@/validations/budgetValidation";
import { TCategory } from "@/types";
import { createBudget } from "@/services/Budget";

type Props = {
  mode: "create" | "edit";
  budget?: any;
  isIcon?: boolean;
  onSuccess?: () => void;
  categories: TCategory[];
  // নতুন প্রপস যোগ করা হয়েছে
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function BudgetFormModal({
  mode,
  budget,
  isIcon,
  onSuccess,
  categories,
  open: externalOpen, // বাইরে থেকে পাঠানো open
  onOpenChange: setExternalOpen, // বাইরে থেকে পাঠানো কন্ট্রোল ফাংশন
}: Props) {
  const isEdit = mode === "edit";
  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");

  // ইন্টারনাল স্টেট এবং এক্সটারনাল স্টেটের মধ্যে সমন্বয়
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? setExternalOpen : setInternalOpen;

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const today = new Date();
  const todayDate = format(today, "yyyy-MM-dd");
  const currentMonth = format(today, "yyyy-MM");

  const getDefaultValues = (): BudgetFormValues => {
    if (isEdit) {
      return {
        type: budget?.type ?? "DAILY",
        date: budget?.date ?? "",
        month: budget?.month ?? "",
        amount: budget?.amount ? String(budget.amount) : "",
        categoryId: budget?.categoryId ?? "",
      };
    }

    return {
      type: "DAILY",
      date: todayDate,
      month: "",
      amount: "",
      categoryId: "",
    };
  };

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const selectedType = watch("type");
  const selectedCategoryId = watch("categoryId");
  const selectedCategory = expenseCategories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  // যখনই মডেল ওপেন হবে, ফর্ম রিসেট হবে
  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues());
    }
  }, [isOpen, budget]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTypeChange = (value: "DAILY" | "MONTHLY") => {
    setValue("type", value, { shouldValidate: true });

    if (value === "DAILY") {
      setValue("date", watch("date") || todayDate, { shouldValidate: true });
      setValue("month", "", { shouldValidate: true });
      setMonthPickerOpen(false);
    } else {
      setValue("month", watch("month") || currentMonth, {
        shouldValidate: true,
      });
      setValue("date", "", { shouldValidate: true });
      setDatePickerOpen(false);
    }
  };

  const handleClose = () => {
    reset(getDefaultValues());
    setDatePickerOpen(false);
    setMonthPickerOpen(false);
    setOpen?.(false);
  };

  const onSubmit = async (values: BudgetFormValues) => {
    try {
      let result = await createBudget({
        categoryId: values.categoryId,
        amount: Number(values.amount),
        type: values.type,
        date: values.date || undefined,
        month: values.month || undefined,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(
        isEdit ? "Budget updated successfully" : "Budget created successfully",
      );

      handleClose();
      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.message || `Failed to ${isEdit ? "update" : "create"} budget`,
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* যদি বাইরে থেকে কন্ট্রোল করা না হয় (যেমন QuickActions ছাড়া অন্য কোথাও), তবেই Trigger দেখাবে */}
      {!isControlled && (
        <DialogTrigger asChild>
          {isIcon ? (
            <Button
              size="icon"
              className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <Plus className="h-7 w-7" />
            </Button>
          ) : isEdit ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700">
              <Plus className="h-4 w-4" />
              Add Budget
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[90%] md:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: "DAILY" | "MONTHLY") =>
                      handleTypeChange(value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select budget type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={selectedType === "DAILY" ? "date" : "month"}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">
                    {selectedType === "DAILY" ? "Select Date" : "Select Month"}
                  </FormLabel>
                  {selectedType === "DAILY" ? (
                    <Popover
                      open={datePickerOpen}
                      onOpenChange={setDatePickerOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full justify-start py-5 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(new Date(field.value), "dd MMMM yyyy")
                              : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (!date) return;
                            field.onChange(format(date, "yyyy-MM-dd"));
                            setDatePickerOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Popover
                      open={monthPickerOpen}
                      onOpenChange={setMonthPickerOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full justify-start py-5 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(
                                  new Date(`${field.value}-01`),
                                  "MMMM yyyy",
                                )
                              : "Pick a month"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto py-5" align="start">
                        <MonthPicker
                          selectedMonth={
                            field.value
                              ? new Date(`${field.value}-01`)
                              : undefined
                          }
                          onMonthChange={(date) => {
                            if (!date) return;
                            field.onChange(format(date, "yyyy-MM"));
                            setMonthPickerOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="!mt-3">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5"
                      type="number"
                      placeholder="e.g. 1500"
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        amountInputRef.current = e;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="max-h-72 overflow-y-auto -mx-1 px-1">
                    {expenseCategories.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No expense categories available
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {expenseCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              field.onChange(cat.id);
                              setTimeout(
                                () => amountInputRef.current?.focus(),
                                80,
                              );
                            }}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                              "border hover:bg-primary/10 hover:text-primary hover:border-primary/40",
                              field.value === cat.id
                                ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
                                : "text-muted-foreground border-transparent",
                            )}
                          >
                            <span className="text-base">{cat.emoji}</span>
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                  {selectedCategory && (
                    <p className="text-xs text-muted-foreground mt-1.5 text-center">
                      Selected: {selectedCategory.emoji} {selectedCategory.name}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col sm:flex-row gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update Budget"
                    : "Create Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
