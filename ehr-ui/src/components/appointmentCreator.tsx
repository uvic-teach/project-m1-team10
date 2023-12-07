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

const inter = Inter({ subsets: ["latin"] });

type doctor = {
    id: number;
    name: string;
    specialty: string;
};

let doctors: doctor[] = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Family Physician",
    },
    {
        id: 2,
        name: "Dr. Lily Chang",
        specialty: "Dermatologist",
    },
    {
        id: 3,
        name: "Dr. William Perth",
        specialty: "Cardiologist",
    },
    {
        id: 4,
        name: "Dr. Jessica Smith",
        specialty: "Gynecologist",
    },
    {
        id: 5,
        name: "Dr. Robert Lee",
        specialty: "Neurologist",
    },
    {
        id: 6,
        name: "Dr. Sarah Jones",
        specialty: "Pediatrician",
    },
    {
        id: 7,
        name: "Dr. David Wang",
        specialty: "Psychiatrist",
    },
    {
        id: 8,
        name: "Dr. Mary Brown",
        specialty: "Radiologist",
    },
    {
        id: 9,
        name: "Dr. Michael Miller",
        specialty: "Surgeon",
    },
    {
        id: 10,
        name: "Dr. Lisa Wilson",
        specialty: "Urologist",
    },
    {
        id: 11,
        name: "Dr. James Taylor",
        specialty: "Ophthalmologist",
    },
    {
        id: 12,
        name: "Dr. Karen Anderson",
        specialty: "Otolaryngologist",
    },
    {
        id: 13,
        name: "Dr. Charles Thomas",
        specialty: "Oncologist",
    },
    {
        id: 14,
        name: "Dr. Patricia Jackson",
        specialty: "Endocrinologist",
    },
    {
        id: 15,
        name: "Dr. Christopher White",
        specialty: "Gastroenterologist",
    },
    {
        id: 16,
        name: "Dr. Jennifer Harris",
        specialty: "Nephrologist",
    },
    {
        id: 17,
        name: "Dr. Daniel Martin",
        specialty: "Rheumatologist",
    },
    {
        id: 18,
        name: "Dr. Elizabeth Thompson",
        specialty: "Allergist",
    },
    {
        id: 19,
        name: "Dr. Matthew Garcia",
        specialty: "Anesthesiologist",
    },
    {
        id: 20,
        name: "Dr. Betty Martinez",
        specialty: "Hematologist",
    },
    {
        id: 21,
        name: "Dr. Anthony Robinson",
        specialty: "Pathologist",
    },
    {
        id: 22,
        name: "Dr. Dorothy Clark",
        specialty: "Physiatrist",
    },
];

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

    const [open, setOpen] = React.useState<boolean>(false);

    let createAppointment = async (e: React.SyntheticEvent) => {
        console.log("Creating appointment");
        console.log(date);
        console.log(doctor);
        console.log(time);
        setOpen(false);
    };

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
                                        {doctors.map((doctor) => (
                                            <SelectItem
                                                key={doctor.id}
                                                value={String(doctor.id)}
                                            >
                                                {doctor.name} -{" "}
                                                {doctor.specialty}
                                            </SelectItem>
                                        ))}
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
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={createAppointment}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
