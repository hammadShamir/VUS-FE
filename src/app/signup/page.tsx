"use client";
import { ISignUP } from '@/interfaces/Auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

const Page = () => {
    const [formData, setFormData] = useState<ISignUP>({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <main className="relative w-full h-screen flex flex-col md:flex-row justify-center items-center">
            <div className="flex-1 h-full">
                <Image
                    src={'/assets/img/signin-signup.png'}
                    alt="Sign In Sign Up Image"
                    width={1000}
                    height={1000}
                    className="w-full h-full"
                />
            </div>
            <div className="flex-1 h-full bg-background flex justify-center items-center">
                <form onSubmit={handleSubmit} className="absolute md:relative top-[50%] md:top-auto translate-y-[-50%] md:translate-y-[auto] bg-background md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-6 gap-y-3 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-primary)]">Create An Account</h1>
                    <div className='md:max-w-md w-10/12 md:w-10/12'>
                        <input
                            type="text"
                            name="fullname"
                            required
                            className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
                            onChange={handleChange}
                            value={formData.fullname}
                            placeholder='Full name'
                        />
                    </div>
                    <div className='md:max-w-md w-10/12 md:w-10/12'>
                        <input
                            type="email"
                            name="email"
                            required
                            className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder='Email'
                        />
                    </div>
                    <div className='md:max-w-md w-10/12 md:w-10/12'>
                        <input
                            type="number"
                            name="phone"
                            required
                            className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
                            onChange={handleChange}
                            value={formData.phone}
                            placeholder='Phone Number'
                        />
                    </div>
                    <div className='md:max-w-md w-10/12 md:w-10/12'>
                        <input
                            type="password"
                            name="password"
                            required
                            className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder='Password'
                        />
                    </div>
                    <div className='md:max-w-md w-10/12 md:w-10/12'>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            className="bg-accentColor px-4 py-2 md:p-4 rounded-md w-full font-[family-name:var(--font-secondary)]"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder='Confirm Password'
                        />
                    </div>

                    <button type='submit' className='bg-primary text-background px-10 py-2  rounded-md font-[family-name:var(--font-secondary)] text-lg text-bold'>Sign Up</button>
                    <p className="text-sm md:text-base text-center text-foreground font-[family-name:var(--font-secondary)]">
                        Already have an account?
                        <Link href="/login" className="text-primary underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Page;
