import { FaFolder, FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { HiUserGroup } from "react-icons/hi2";
import Link from "next/link";

export const doctorNavItems= [
    {
      name: "Dashboard",
      href: "/doctor-dashboard",
      icon: <CiHome className="w-6 h-6" />,
      current: true
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
      icon: <FaFolder className="w-6 h-6" />,
      current: false,
    },
    {
        name: "Availability",
        href: "/availabilty",
        icon: <FaFolder className="w-6 h-6" />,
        current: false
      },
]