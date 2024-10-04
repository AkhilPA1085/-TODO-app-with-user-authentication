import { Modal, ModalContent } from "@nextui-org/react";
import CustomButton from "../basic/CustomButton";

type BaseModalProps = {
  label?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  buttonClass?: string;
  buttonIcon?: string;
};

export default function BaseModal({
  label,
  children,
  isOpen,
  buttonClass,
  onOpenChange,
}: BaseModalProps) {
  return (
    <>
      {label && (
        <CustomButton
          label={label}
          onClick={() => onOpenChange(true)}
          className={buttonClass}
        />
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-10">{() => <>{children}</>}</ModalContent>
      </Modal>
    </>
  );
}
