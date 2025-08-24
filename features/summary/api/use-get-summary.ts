import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  return useQuery({
    enabled: true,
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary["$get"]({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: data.incomeAmount,
        expensesAmount: data.expensesAmount,
        remainingAmount: data.remainingAmount,
        categories: data.categories,
        days: data.days,
        remainingPercentageChange: data.remainingPercentageChange,
      };
    },
  });
};
