import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { FaRegCircleCheck } from "react-icons/fa6";
import Link from "next/link";

export const doctorNavItems = [
    {
        name: "Dashboard",
        href: "/doctor-dashboard",
        icon: <MdSpaceDashboard className="w-6 h-6" />,
        current: true,
    },
    {
        name: "Patient Lookup",
        href: "/patient-lookup",
        icon: <HiUserGroup className="w-6 h-6" />,
        current: false,
    },
    {
        name: "Appointments",
        href: "/appointments",
        icon: <IoMdCalendar className="w-6 h-6" />,
        current: false,
    },
    {
        name: "Availability",
        href: "/availability",
        icon: <FaRegCircleCheck className="w-6 h-6" />,
        current: false,
    },
];
