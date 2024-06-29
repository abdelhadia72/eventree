import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useLogout } from '../../Hooks/useLogout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LogOut } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Key } from 'lucide-react';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthContext();

    // console.log("User is ", user.user.username)

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-8" alt="Eventree Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Eventree</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    { !user &&
                           <Link to='signup' type="button" className="text-white bg-red-600 hover:bg-red-800 active:scale-95 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 flex gap-2 items-center font-bold"><LogOut  className="size-5"/>Sign Up</Link>
                    }

                    {user &&
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <Avatar >
                                    <AvatarImage src="https://avatar.iran.liara.run/public/11" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="uppercase text-red-400">{user && user.user.username}</DropdownMenuLabel>
                                <DropdownMenuSeparator/>

                                <DropdownMenuItem className="row flex gap-2 items-center cursor-pointer">
                                    <UserRound  className="size-5"/>
                                    <Link to='/profile'>Profile</Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="row flex gap-2 items-center cursor-pointer">
                                    <Sparkles className="size-5" />
                                    <p>Upgrade</p>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="row flex gap-2 items-center cursor-pointer">
                                    <Settings className="size-5" />
                                    <p>Settings</p>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={useLogout()} className="row flex gap-2 items-center cursor-pointer">
                                    <LogOut className="size-5"/>
                                    <p>Logout</p>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    }


                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                {user &&
                    <div
                        className={`items-center font-bold text-lg justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
                        id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/"
                                      className="block font-bold text-lg py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500"
                                      aria-current="page">Home</Link>
                            </li>
                            <li className="block py-2 px-3 font-bold text-lg cursor-pointer  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                        Events
                            </li>
                            <li>
                                <Link to="/event/create"
                                      className="block font-bold text-lg py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create</Link>
                            </li>
                            <Link to='/about' className="block font-bold text-lg py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer">
                                    About
                            </Link>
                        </ul>
                    </div>

                }
            </div>
        </nav>
    );
}

export default Navbar;