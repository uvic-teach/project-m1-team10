"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { SidebarProps } from "@/interfaces/types";

export default function SideNavbar({ SideBarItems }:SidebarProps ) {

    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu className="block md:hidden h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
                <div className="mx-auto p-6 w-1/3 lg:w-60 relative h-screen bg-white z-10 flex top-0 -left-96 lg:left-0  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                    
                        <div className=" flex my-4 border-b border-gray-100 pb-1">
                            <ul>
                                {SideBarItems.map((item, index) => {
                                return (
                                <li key={index}
                                    className="flex mb-2 justify-start items-center gap-4 p1-5 hover:bg-gray-gee p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                                >
                                    <Link href={item.href} className="flex gap-2 text-gray-800">
                                        {item.icon} 
                                        <span>{ item.name}</span>
                                    </Link>
                                </li>
                                );
                                })}

                            </ul>
                            
                        </div>
        
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

