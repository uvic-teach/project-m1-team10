import { FaFolder, FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { HiUserGroup } from "react-icons/hi2";
import Link from "next/link";

export const patientNavItems= [
    {
      name: "Dashboard",
      href: "/patient-dashboard",
      icon: <CiHome className="w-6 h-6" />,
      current: false
    },
    {
      name: "History",
      href: "/history",
      icon: <HiUserGroup className="w-6 h-6" />,
      current: false
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: <FaFolder className="w-6 h-6" />,
      current: false,
    },
]