"use client"

import Modal from "@/components/modals/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean,
    onClose: () => void,
    src?: string | null
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
    if (!src) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="h-80 w-full">
                <Image
                    alt="Priview image"
                    className="object-contain"
                    src={src}
                    fill
                />
            </div>
        </Modal>
    );
}

export default ImageModal;