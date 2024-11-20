'use client'
import { Select, SelectItem } from "@nextui-org/react";
import { STATUS_VALUES } from '@/contant_utils/data'
import { useEffect, useState } from "react";
import { ErrorField } from "@/app/types/definitions";

type StatusSelectProps = {
    name: string;
    placeholder?: string;
    onSelectSubmit: (value: string) => void;
    error?: { [key: string]: ErrorField };
    initialValue?:string
}

export default function StatusSelect({ name, placeholder, onSelectSubmit,initialValue, error }: StatusSelectProps) {
    const [value, setValue] = useState<string | null>(initialValue || null);
    useEffect(() => {
        if (initialValue) {
          setValue(initialValue);
        }
      }, [initialValue]);

    const onSelect = (selectedKey: any) => {
        const selectedValue = Array.isArray(selectedKey) ? selectedKey[0] : Array.from(selectedKey as Set<React.Key>)[0];
        if (selectedValue) {
            setValue(selectedValue);
            onSelectSubmit(selectedValue);
        }
    };
    return (
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Select
                    label={placeholder}
                    selectedKeys={value ? new Set([value]) : new Set()}
                    onSelectionChange={onSelect}
                >
                    {STATUS_VALUES.map((status) => (
                        <SelectItem key={status.value}>
                            {status.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {error && error['status'] && (
                <p className='text-red-600 text-sm'>
                    {error[name]?.message}
                </p>
            )}
        </>
    );
}