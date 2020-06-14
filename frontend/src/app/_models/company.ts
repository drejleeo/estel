export class RelateToCompany {
  name: string;
  logo: string;
  cover: string;
  about: string;
}

export class Company extends RelateToCompany {
    id: number;
}
