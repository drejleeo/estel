import { Location } from './location';

export class RelatedToParking {
    id: number;
    address: string;
    company: string;
}

export class Parking {
    id: number;
    location: Location;
    total_spots: number;
    available_spots: number;
    isFull: boolean;
}
