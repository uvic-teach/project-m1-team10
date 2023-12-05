import { MdSpaceDashboard } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";

export const patientNavItems= [
    {
      name: "Dashboard",
      href: "/patient-dashboard",
      icon: <MdSpaceDashboard className="w-6 h-6" />,
      current: false
    },
    {
      name: "History",
      href: "/history",
      icon: <BsPersonLinesFill className="w-6 h-6" />,
      current: false
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: <FaRegCircleCheck className="w-6 h-6" />,
      current: false,
    },
]