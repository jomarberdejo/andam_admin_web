import mdrcover from "@/assets/images/cover/mdr-cover.jpg";
import bfpcover from "@/assets/images/cover/bfp-cover.png";
import lgucover from "@/assets/images/cover/lgu-cover.jpg";
import pnpcover from "@/assets/images/cover/pnp-cover.jpg";
import { z } from "zod";

// import mdrcover from "@/assets/images/undraw/undraw3.png";
// import bfpcover from "@/assets/images/undraw/undraw2.png";
// import lgucover from "@/assets/images/undraw/undraw3.png";
// import pnpcover from "@/assets/images/undraw/undraw4.png";

export const LoginFormSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export const agencyDetails = [
  {
    title: "Municipal Disaster Risk Reduction and Management Office (MDRRMO)",
    description:
      "Responsible for disaster preparedness and response plans. For more information, visit the",
    link: "https://www.facebook.com/",
    logo: mdrcover,
    linkText: "MDRRMO Facebook Page",
  },
  {
    title: "Philippine National Police (PNP)",
    description:
      "Responsible for maintaining law and order. For more information, visit the",
    link: "https://www.facebook.com/",
    logo: pnpcover,
    linkText: "PNP Facebook Page",
  },
  {
    title: " Bureau of Fire Protection (BFP)",
    description:
      "Responsible for fire safety and prevention. For more information, visit the",
    link: "https://www.facebook.com/",
    logo: bfpcover,
    linkText: "BFP Facebook Page",
  },
  {
    title: "Local Government Unit (LGU)",
    description:
      "Responsible for local governance and services. For more information, visit the",
    link: "https://www.facebook.com/",
    logo: lgucover,
    linkText: "LGU Facebook Page",
  },
];
