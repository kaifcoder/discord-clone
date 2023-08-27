import { ChannelType, Server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "editServer" | "invite" | "members" | "createChannel" | "leaveServer" | "deleteServer";

interface ModalData {
    server?: Server;
    channelType?: ChannelType;
}


interface ModalStoreProps {
    type: ModalType| null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data={}) => set({type, isOpen: true, data}),
    onClose: () => set({type: null, isOpen: false}),
}));