"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';

 export default function Header(){
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const {status, data} = useSession();
    const handleLoginClick = () => signIn()
    const handleMenuClick = () => setMenuIsOpen(true)
    const handleLogoutClick = () => {
        setMenuIsOpen(false)
        signOut()
    }
    console.log(data)

    return(
        <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
            <div className="relative h-[32px] w-[182px]">
                <Image src="/logo.png" alt="Full Stack Week" fill />
            </div>
            { status === "unauthenticated" && (
                <button
                    onClick={handleLoginClick}
                    className="text-primary text-sm font-semibold">
                    Login
                </button>)
            }

            { status === "authenticated" && data.user && (
                <div className="flex items-center gap-3 p-2 px-3 border border-solid border-grayLighter rounded-full relative">
                    <AiOutlineMenu className="cursor-pointer" onClick={handleMenuClick} size={16} />
                    <Image
                        height={35}
                        width={35}
                        src={data.user.image!}
                        alt={data.user.name!} 
                        className="rounded-full shadow-md"
                    />
                    {menuIsOpen && (
                        <div className="absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                            <button className="text-primary text-sm font-semibold" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    )}
                </div>)
            }
        </div>
    )
 }
