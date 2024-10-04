import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import CustomButton from "../basic/CustomButton";

type BaseModalProps = {
    label?: string;
    children: React.ReactNode;
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void
}

export default function BaseModal({ label, children, isOpen, onOpenChange }: BaseModalProps) {
    return (
        <>
            {label &&
                <CustomButton
                    label={label}
                    onClick={() => onOpenChange(true)} />
            }

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-10">
                    {() => (
                        <>
                            {children}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}