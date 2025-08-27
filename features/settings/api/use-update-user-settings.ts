import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api)["user-settings"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api)["user-settings"]["$patch"]
>;

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api["user-settings"].$patch({ json });
      if (!response.ok) {
        throw new Error("Failed to update user settings");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
    },
    onError: () => {
      toast.error("Failed to update settings. Please try again.");
    },
  });

  return mutation;
};
