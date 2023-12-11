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

export interface historyItem {
    id: number,
    doctor: number,
    description: string,
    created_at: string,
    user: number
}