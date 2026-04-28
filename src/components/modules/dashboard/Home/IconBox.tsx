import { cn } from "@/lib/utils";

function IconBox({
  icon: Icon,
  color,
  small = false,
}: {
  icon: any;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        small ? "h-11 w-11" : "h-14 w-14",
        color === "blue" && "bg-blue-50 text-blue-600",
        color === "green" && "bg-emerald-50 text-emerald-600",
        color === "red" && "bg-red-50 text-red-500",
        color === "purple" && "bg-violet-50 text-violet-600",
        color === "orange" && "bg-orange-50 text-orange-500",
      )}
    >
      <Icon className={small ? "h-5 w-5" : "h-6 w-6"} />
    </div>
  );
}

export default IconBox;
