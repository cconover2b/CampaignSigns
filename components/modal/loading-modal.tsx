// components/modal/loading-modal.tsx
import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog";
import React from "react";
import Loader from "../ui/loader"; // Ensure this path is correct

function LoadingModal({
    open
}: { open: boolean }) {
    return (
        <AlertDialog open={open}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent className="flex p-4 align-middle justify-between">
                Please wait...
                <Loader />
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LoadingModal;