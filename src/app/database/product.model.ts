
export interface Product {
    id?: string;
    serialCode: string;
    name : string;
    image : string;
    genre : Date;
    price : number;
    quantity: number;
    size: string;
    detail: string;
    bestSaleler:Boolean;
}