import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Frown } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="container flex items-center gap-2 justify-center flex-col h-screen">
      <div>
        <p className="text-center flex items-center gap-2 justify-center">
          404 Error Page Not Found <Frown />
        </p>
        <Separator className="my-3" />
        <div
          className="flex justify-center"
          onClick={() => navigate(`${isLoggedIn ? "/dashboard" : "/"}`)}
        >
          <Button
            variant="outline"
            className="text-center flex items-center gap-2 justify-center"
          >
            <ArrowLeft />
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
