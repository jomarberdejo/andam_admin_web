import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useGetUser } from "@/customhooks/useGetUser";
import { EmergencyNumberInput } from "./emergency-number-input";
import { contactFormSchema } from "../constants";

export function ContactForm() {
  const { agency } = useGetUser();
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    const fetchContactNumber = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/contact`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const resData = await res.data;

        const filtered = resData.filter((contact) => contact.agency === agency);

        form.setValue("phone", filtered[0]?.number || "");
      } catch (error) {
        console.error("Error fetching contact number:", error);
      }
    };

    if (agency) {
      fetchContactNumber();
    }
  }, [agency]);

  const { control } = form;

  async function onSubmit(data) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/contact`,
        {
          number: data.phone,
          agency: agency,
        },
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
        description: "Contact updated successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast({
        title: "Failed",
        description: error.response.data.error,
        status: "error",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <EmergencyNumberInput control={control} />

        <Button type="submit">Update Emergency Number</Button>
      </form>
    </Form>
  );
}
