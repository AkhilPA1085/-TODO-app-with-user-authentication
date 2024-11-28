import React from "react";
import { Chip } from "@nextui-org/react";

interface ChipInputProps {
  values: string[];
}

const ChipInput: React.FC<ChipInputProps> = ({ values }) => {
  const [chips, setChips] = React.useState<string[]>(values);

  const handleClose = (chipToRemove: string) => {
    const newChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(newChips);
  };

  return (
    <div className="flex gap-2">
      {chips.map((chip, index) => (
        <Chip key={index} onClose={() => handleClose(chip)} variant="flat">
          {chip}
        </Chip>
      ))}
    </div>
  );
};

export default ChipInput;
