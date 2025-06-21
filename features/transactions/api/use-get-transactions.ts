import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const searchParams = useSearchParams();

  return useQuery({
    // Todo: Check if params need
    queryKey: ["transactions", searchParams],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from: searchParams.get("from") || undefined,
          to: searchParams.get("to") || undefined,
          accountId: searchParams.get("accountId") || undefined,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
