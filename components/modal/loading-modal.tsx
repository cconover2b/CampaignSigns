import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Loader from "../ui/loader";

interface LoadingModalProps {
  open: boolean;
  message?: string;
}

function LoadingModal({ open, message = "Please wait..." }: LoadingModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-lg font-semibold">{message}</p>
        <Loader />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingModal;