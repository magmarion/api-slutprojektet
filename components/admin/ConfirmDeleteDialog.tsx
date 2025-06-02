"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmDeleteDialogProps {
  open: boolean; // Whether dialog is currently open
  onOpenChange: (open: boolean) => void; // Called when dialog opens/closes
  onConfirm: () => void; // Called when user confirms deletion
  productTitle: string; // For displaying the product name in the prompt
  children: React.ReactNode; // The trigger button(s) or element(s)
}

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  productTitle,
  children,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bekräfta radering</DialogTitle>
          <DialogDescription>
            Är du säker på att du vill ta bort <strong>{productTitle}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="destructive"
            data-cy="confirm-delete-button"
            className="w-full sm:w-auto"
            onClick={onConfirm}
          >
            Ja, ta bort
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Avbryt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
