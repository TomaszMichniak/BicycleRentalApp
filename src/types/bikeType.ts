export type BikeType={
    id: string;
    name: string;
    description: string;
    size: BikeSize;
    imageUrl: string;
    pricePerDay: number;
    isAvailable: boolean;
}
export enum BikeSize {  
    S = 0,
    M = 1,
    L = 2,
    XL = 3,}
