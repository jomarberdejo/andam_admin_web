import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CopyCheck } from "lucide-react";
import { formatDate } from "@/lib/dateFormat";

export function useNotification() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const renderNotif = (audio, data, socketRef) => {
    console.log(data);
    toast({
      title: `${data.latitude}, ${data.longitude}`,
      text: (
        <Button
          variant="outline"
          className="bg-transparent"
          onClick={() => {
            navigator.clipboard.writeText(
              `${data.latitude}, ${data.longitude}`
            );
          }}
        >
          <CopyCheck className="w-4 h-4 mr-2" />
          Copy Geographic Location
        </Button>
      ),
      description: `A new report was submitted from ${
        data.location
      } (${formatDate(data.reportedAt)})`,
      action: (
        <>
          <ToastAction
            altText="View Report"
            onClick={() => {
              audio.stop();
              navigate("/reports");
              socketRef.current.emit("report-viewed", data);
            }}
          >
            Notify Resident (Seen)
          </ToastAction>
        </>
      ),
      showCloseButton: false,
    });
  };

  return { renderNotif };
}
