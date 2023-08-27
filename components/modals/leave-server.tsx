"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();
  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-2xl font-bold text-center text-indigo-500">
            Leave Server
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-center text-neutral-900 dark:text-neutral-900">
            Are you sure you want to leave this{" "}
            <span className="font-semibold text-indigo-500 ">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>

            <Button
              disabled={loading}
              onClick={onClick}
              variant="primary"
              className="bg-red-500 hover:bg-red-600"
            >
              Leave Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
