import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";


import { useNavigate } from "react-router-dom";
import { LoginForm } from "./login-form";


export function Login() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[95%]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Please login to continue.</DialogDescription>
        </DialogHeader>
        <LoginForm navigate={navigate} authenticateUser={authenticateUser} toast={toast} />
      </DialogContent>
    </Dialog>
  );
}
