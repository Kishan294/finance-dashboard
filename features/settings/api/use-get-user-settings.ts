import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetUserSettings = () => {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: async () => {
      const response = await client.api["user-settings"].$get();
      if (!response.ok) {
        throw new Error("Failed to fetch user settings");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
