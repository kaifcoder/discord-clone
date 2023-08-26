import {create} from "zustand";

export type ModalType = "createServer" | "editServer" ;

interface ModalStoreProps {
    type: ModalType| null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({type, isOpen: true}),
    onClose: () => set({type: null, isOpen: false}),
}));