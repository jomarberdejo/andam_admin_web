import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/customhooks/useGetUser";
import { adminFormSchema } from "../constants";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminModal = ({ children }) => {
  const { agency } = useGetUser();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(adminFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      agency: agency || "",
    },
  });

  const { handleSubmit, formState } = form;

  async function onSubmit(data) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await res.data;
      console.log(responseData);
      toast({
        title: "Success",
        description: "New admin added successfully.",
        status: "success",
      });
      form.reset();
      form.clearErrors();
      queryClient.invalidateQueries("users");
    } catch (error) {
      toast({
        title: "Failed",
        description: error.response.data.error,
        status: "error",
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="top"
        style={{ maxHeight: "100svh", overflowY: "auto" }}
      >
        <SheetHeader>
          <SheetTitle>Add New Admin</SheetTitle>
          <SheetDescription>
            Please fill out necessary fields to register a new Admin. Click save
            when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormDescription>This is the admin's name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the admin's username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the admin's email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the admin's password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="agency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="agency">Agency</FormLabel>
                    <FormControl>
                      <Input
                        id="agency"
                        disabled
                        placeholder="Agency"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminModal;
