import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useGetUser } from "@/customhooks/useGetUser";
import { profileFormSchema } from "../constants";
import axios from "axios";

export function AccountForm() {
  const { id, name, username, email, agency } = useGetUser();

  const defaultValues = {
    name: name || "",
    username: username || "",
    email: email || "",
    agency: agency || "",
  };

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    control: form.control,
  });

  async function onSubmit(data) {
    console.log(data);
    const updatedProfileData = {
      name: data.name,
      username: data.username,
      email: data.email,
      agency: data.agency,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/user/${id}`,
        updatedProfileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = await res.data;
      toast({
        title: "Success",
        description: "Account profile updated successfully.",
        status: "success",
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...data,
          id: id,
        })
      );
    } catch (err) {
      toast({
        title: "Failed",
        description: err.response.data.error,
        status: "success",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                nickname.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Jomar" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display username
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency</FormLabel>
              <FormControl>
                <Input disabled placeholder="Agency" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Update your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {/* {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))} */}
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button> */}
        </div>
        <Button type="submit">Update Account</Button>
      </form>
    </Form>
  );
}
