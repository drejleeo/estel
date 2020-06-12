import { RelatedToParking } from './parking';

export class ReservationPublic {
    parking: RelatedToParking;
    description: string;
    start_date: string;
    end_date: string;
    regime: number;
    created_on: string;
}

export class ReservationFull extends ReservationPublic {
    id: number;
    spot: number;
    author: string;
}
