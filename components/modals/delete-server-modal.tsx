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

export const DeleteServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push("/");
      window.location.reload();
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
          <DialogTitle className="text-2xl font-bold text-center text-red-500">
            Delete Server
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-center text-neutral-900 dark:text-neutral-900">
            Are you sure you want to delete this{" "}
            <span className="font-semibold text-red-500 ">{server?.name}</span>?
            If you delete this server, you will lose all of your data.
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
              Delete Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
