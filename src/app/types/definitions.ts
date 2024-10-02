import { Dispatch, SetStateAction } from "react";

export type SignUpForm = {
    username: string;
    email: string;
    password: string;
}

export type LoginForm = {
    email: string;
    password: string;
}

export type ListType = {
    data: string;
    _id: string
}

export type ReactSetState<T> = Dispatch<SetStateAction<T>>

export type InputFieldType = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type?: 'text' | 'color' | 'password' | 'email' | 'tel' | 'number';
    placeholder?: string;
    value?: any;
    [key: string]: any;
}

export type ButtonType = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    href?: string;
    label?: string;
    type?: 'submit' | 'button';
    icon?:string
    [key: string]: any;
}

export type postData = {
    userId:string,
    item:string
}