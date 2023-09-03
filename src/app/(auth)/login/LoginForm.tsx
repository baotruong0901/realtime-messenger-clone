'use client'

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthSocialbutton from "@/components/AuthSocialbutton";

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        //nextauth social sign in
    }
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {isLoading ? 'loading...' : 'Login'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialbutton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialbutton
                            icon={FcGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>

                    <div className="flex gap-2 items-center justify-center text-sm mt-6 px-2 text-gray-500">
                        <span>
                            New to Messenger?
                        </span>
                        <span
                            onClick={() => router.push('register')}
                            className="underline cursor-pointer"
                        >
                            Create an account
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;