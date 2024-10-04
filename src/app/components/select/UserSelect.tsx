import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getAllUsers } from "@/services/user.services";
import { ErrorField, User } from "@/app/types/definitions";
import { Key } from "@react-types/shared";

type UserSelectProps = {
    name: string;
    placeholder: string;
    onSelectUsers: (selectedUsers: string[]) => void,
    error?: { [key: string]: ErrorField };
    initialUsers?:string[]
}

export default function UserSelect({ name, placeholder, onSelectUsers,initialUsers,error }: UserSelectProps) {
    const [users, setUsers] = useState<User[]>([])
    const [values, setValues] = useState<Set<Key>>(new Set(initialUsers));
    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data)
        })
    }, [])

    const handleSelectionChange = (selectedKeys: "all" | Set<Key>) => {
        // Handle the selection change, ensuring selectedKeys is of type Set<Key>
        if (selectedKeys !== "all") {
            setValues(selectedKeys);
            onSelectUsers(Array.from(selectedKeys) as string[]);
        }
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <Select
                label={placeholder}
                selectionMode="multiple"
                selectedKeys={values}
                onSelectionChange={handleSelectionChange}
            >
                {users.map((user) => (
                    <SelectItem key={user?._id}>
                        {user?.username}
                    </SelectItem>
                ))}
            </Select>
            {error && error[name] && (
                <p className='text-red-600 text-sm'>
                    {error[name]?.message}
                </p>
            )}
        </div>
    );
}
