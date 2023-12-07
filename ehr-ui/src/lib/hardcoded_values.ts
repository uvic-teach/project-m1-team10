export type Doctor = {
    id: number;
    name: string;
    specialty: string;
};

export type DoctorDictionary = Record<number, Doctor>;

export const doctors: DoctorDictionary = {
    1: {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Family Physician",
    },
    2: {
        id: 2,
        name: "Dr. Lily Chang",
        specialty: "Dermatologist",
    },
    3: {
        id: 3,
        name: "Dr. William Perth",
        specialty: "Cardiologist",
    },
    4: {
        id: 4,
        name: "Dr. Jessica Smith",
        specialty: "Gynecologist",
    },
    5: {
        id: 5,
        name: "Dr. Robert Lee",
        specialty: "Neurologist",
    },
    6: {
        id: 6,
        name: "Dr. Sarah Jones",
        specialty: "Family Physician",
    },
    7: {
        id: 7,
        name: "Dr. David Wang",
        specialty: "Psychiatrist",
    },
    8: {
        id: 8,
        name: "Dr. Mary Brown",
        specialty: "Family Physician",
    },
    9: {
        id: 9,
        name: "Dr. Michael Miller",
        specialty: "Surgeon",
    },
    10: {
        id: 10,
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
    },
    11: {
        id: 11,
        name: "Dr. Jennifer Davis",
        specialty: "Gynecologist",
    },
    12: {
        id: 12,
        name: "Dr. Richard Taylor",
        specialty: "Cardiologist",
    },
    13: {
        id: 13,
        name: "Dr. Patricia Anderson",
        specialty: "Neurologist",
    },
};
