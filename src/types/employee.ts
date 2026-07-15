export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    company: {
        department: string;
    };
}
