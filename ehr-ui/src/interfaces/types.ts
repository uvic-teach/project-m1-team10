import React from "react";


export interface SideBarItem {
    name: string,
    href: string,
    icon: React.ReactNode,
    current: boolean
}

export interface SidebarProps {
    SideBarItems: SideBarItem[]
}