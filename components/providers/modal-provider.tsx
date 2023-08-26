"use client";

import { useEffect, useState } from "react";
import { CreateSeverModal } from "../modals/create-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateSeverModal />
    </>
  );
};
