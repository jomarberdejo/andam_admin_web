import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EmergencyNumberInput({ control }) {
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Emergency Number</FormLabel>
          <FormControl>
            <Input
              type="tel"
              placeholder="Enter Emergency Contact Number"
              {...field}
            />
          </FormControl>
          <FormDescription>
            This is the emergency contact number that will be displayed to users
            in case of emergencies. Please provide a valid phone number where
            users can reach your agency for urgent assistance.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
