"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    required?: boolean,
    placeholder?: string,
    type?: string
}

const MessageInput = ({ id, register, errors, required, placeholder, type }: MessageInputProps) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={"off"}
                {...register(id, { required })}
                placeholder={placeholder}
                className="text-white font-light bg-white/10 w-full py-2 px-4 rounded-full focus:outline-none"
            />
        </div>
    );
}

export default MessageInput;