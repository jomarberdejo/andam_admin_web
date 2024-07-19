import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Login } from "@/pages/guest/_auth/Login";

const GuestHeader = () => {
  return (
    <>
      <header className="sticky top-0 left-0 shadow-lg backdrop-blur-lg bg-transparent z-50">
        <nav>
          <ul className="flex items-center justify-between px-4 py-2">
            <li>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                ANDAM
              </h2>
            </li>
            <li className="flex items-center gap-4">
              <ModeToggle />
              <Login>
                <Button variant="outline">Login</Button>
              </Login>
            </li>
          </ul>
        </nav>
      </header>
      <Separator />
    </>
  );
};

export default GuestHeader;
