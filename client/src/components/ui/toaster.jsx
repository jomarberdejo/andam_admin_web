import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircleWarningIcon } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider type="background">
      {toasts.map(
        ({
          id,
          title,
          description,
          action,
          text,
          showCloseButton = true,
          ...props
        }) => {
          const duration = showCloseButton ? 5000 : 86400000;

          return (
            <Toast key={id} duration={duration} {...props} className="mb-2">
              <div className="grid gap-1 w-full ">
                <MessageCircleWarningIcon className="w-6 h-6 mr-2" />
                <div className="flex justify-between items-center gap-4">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {text}
                </div>
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
                {action}
                {showCloseButton && <ToastClose />}
              </div>
            </Toast>
          );
        }
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
