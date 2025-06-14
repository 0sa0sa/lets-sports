import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function CardCheckbox({ id, label, checked, onCheckedChange }: Props) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center space-x-2 p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-blue-100",
        checked ? "bg-blue-200" : ""
      )}
    >
      <Checkbox
        id={id}
        className="h-5 w-5"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
