"use client";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa6";
import {
    appointmentMethods,
    formatDateForAPI,
    formatDateFromAPI,
} from "@/lib/appointments";
import { useAuth } from "../../context/AuthContext";
import { useAppointment } from "../../context/AppointmentContext";
import { doctors } from "@/lib/hardcoded_values";

const inter = Inter({ subsets: ["latin"] });

type appointmentTime = {
    hour: number;
    representation: string;
};

let baseHours: appointmentTime[] = [
    {
        hour: 8,
        representation: "8:00 AM",
    },
    {
        hour: 9,
        representation: "9:00 AM",
    },
    {
        hour: 10,
        representation: "10:00 AM",
    },
    {
        hour: 11,
        representation: "11:00 AM",
    },
    {
        hour: 12,
        representation: "12:00 PM",
    },
    {
        hour: 13,
        representation: "1:00 PM",
    },
    {
        hour: 14,
        representation: "2:00 PM",
    },
    {
        hour: 15,
        representation: "3:00 PM",
    },
    {
        hour: 16,
        representation: "4:00 PM",
    },
];

export default function AppointmentCreate() {
    const [date, setDate] = React.useState<Date>();
    const [doctor, setDoctor] = React.useState<number>();
    const [time, setTime] = React.useState<number>();
    const [method, setMethod] = React.useState<string>();

    const [open, setOpen] = React.useState<boolean>(false);

    const { user } = useAuth();
    const { updateAppointments } = useAppointment();

    let createAppointment = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!date || !doctor || !time || !user?.phn) return;

        let body = {
            date: formatDateForAPI(date),
            doctor: doctor,
            patient: user.phn,
            start: `${time}:00`,
            end: `${time + 1}:00`,
            method: "IN",
        };

        console.log(body);

        const response = await fetch(
            "https://appointment-service.onrender.com/appointments/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            console.error("Failed to create appointment", response);
        } else {
            console.log("Appointment created successfully");
            setOpen(false);
            updateAppointments();
        }
    };

    // ...

    <Button onClick={createAppointment}>Create</Button>;

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="bg-custom-button-green rounded-xl p-3 left-0 hover:bg-custom-button-green/70">
                        <button className="text-white inline-flex">
                            <FaPlus className="-ml-0.5 mr-1.5 h-5 w-5" /> Book
                            an appointment
                        </button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Schedule Appointment</DialogTitle>
                        <DialogDescription>
                            Create a new appointment here
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="doctor" className="text-right">
                                Doctor
                            </Label>
                            <Select
                                onValueChange={(value) =>
                                    setDoctor(Number(value))
                                }
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Doctors</SelectLabel>
                                        {Object.values(doctors).map(
                                            (doctor) => (
                                                <SelectItem
                                                    key={doctor.id}
                                                    value={String(doctor.id)}
                                                >
                                                    {doctor.name} -{" "}
                                                    {doctor.specialty}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Start Time
                            </Label>
                            <Select
                                onValueChange={(hour) => setTime(Number(hour))}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select an hour" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Availabilities
                                        </SelectLabel>
                                        {baseHours.map((hour) => (
                                            <SelectItem
                                                key={hour.hour}
                                                value={String(hour.hour)}
                                            >
                                                {hour.representation}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="method" className="text-right">
                                Method
                            </Label>
                            <Select
                                onValueChange={(method) => setMethod(method)}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Methods</SelectLabel>
                                        <SelectItem key={1} value={"IN"}>
                                            In-Person
                                        </SelectItem>
                                        <SelectItem key={2} value={"VI"}>
                                            Virtual
                                        </SelectItem>
                                        <SelectItem key={3} value={"PH"}>
                                            Phone
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={createAppointment}>
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
