import { z } from "zod";

export const sidebarNavItems = [
  {
    title: "Account",
    href: "/profile/account",
  },
  {
    title: "Emergency Number",
    href: "/profile/contact",
  },

  // {
  //   title: "Appearance",
  //   href: "/appearance",
  // },
];

export const contactFormSchema = z.object({
  phone: z.string().refine((value) => /^[0-9]{11}$/.test(value), {
    message:
      "Please enter a valid 11-digit phone number without spaces or special characters.",
  }),
});

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  agency: z.string(),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),

  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
});
