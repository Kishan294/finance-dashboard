import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ category, categoryId }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center hover:underline",
        !categoryId && "text-rose-500",
      )}
    >
      {!categoryId && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category}
    </div>
  );
};
