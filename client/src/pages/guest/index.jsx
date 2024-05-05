import { Separator } from "@/components/ui/separator";

import GuestHeader from "./_custom_components/guest-header";
import GuestFooter from "./_custom_components/guest-footer";
import { agencyDetails } from "./constants";

const Home = () => {
  return (
    <>
      <GuestHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to ANDAM, The Government Administration Portal
        </h1>
        <p className="text-lg mb-6 text-muted-foreground">
          Here you can access important information, resources, and reports.
          Please sign in to continue accessing relevant informations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agencyDetails.map((agency) => (
            <div
              key={agency.title}
              className="rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={agency.logo}
                alt="MDRRMO"
                className="w-full h-[350px] object-fill hover:scale-105 cursor-pointer transition-all delay-150"
              />
              <div className="py-4">
                <h2 className="text-xl font-semibold mb-2">{agency.title}</h2>
                <p>
                  {agency.description}{" "}
                  <a
                    href="mdrrmo_facebook_link_here"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    {agency.linkText}
                  </a>
                  .
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <GuestFooter />
    </>
  );
};

export default Home;
