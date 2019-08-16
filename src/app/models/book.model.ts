export interface IBook {
    id: number;
    Title: string;
    Publisher: string;
    Price: number;
    Availability: number;
    Authors: string[];
}

export class Book implements IBook{
    id: number;
    Title: string;
    Publisher: string;
    Price: number;
    Availability: number;
    Authors: string[];
}

