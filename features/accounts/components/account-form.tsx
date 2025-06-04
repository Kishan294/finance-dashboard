import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/database/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod/v4";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues: FormValues;
  onSubmit?: (data: FormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const AccountForm = ({
  defaultValues,
  disabled,
  id,
  onDelete,
  onSubmit,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit?.(data);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  console.log({ insertAccountSchema });
  console.log({ formSchema });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 p-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled} type="submit">
          {id ? "Update Account" : "Create Account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            variant="outline"
            onClick={handleDelete}
            className="w-full"
          >
            <Trash className="size-4 mr-2" />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
};
