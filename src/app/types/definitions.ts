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
    _id: string;
    status: boolean
}

export type ReactSetState<T> = Dispatch<SetStateAction<T>>

export interface ErrorField {
    message: string;
}

export type InputFieldType = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type?: string;
    placeholder?: string;
    value?: any;
    error?: { [key: string]: ErrorField };
    [key: string]: any;
}

export type ButtonType = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    href?: string;
    label?: string;
    type?: 'submit' | 'button';
    icon?: string
    [key: string]: any;
}

export type postData = {
    _id?: string;
    todo: string,
    userId: string,
    assignedTo:string[],
    status: string,
    end_date: string
}

export type User = {
    _id: string;
    username: string;
    email: string
}