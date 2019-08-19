export interface IBookBase {
    firebaseId: number;    
    Availability: number;
    Shipping: string;
}

export interface IBook extends IBookBase{
    id: number;
    Title: string;
    Publisher: string;
    Price: number;
    Availability: number;
    Authors: string[];
    Shipping: string;
}

export class Book implements IBook{
    firebaseId: number;
    id: number;
    Title: string;
    Publisher: string;
    Price: number;
    Availability: number;
    Authors: string[];
    Shipping: string;
    FieldToShow: string;
    ValueToShow: any;
}

