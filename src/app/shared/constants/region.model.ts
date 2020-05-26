import { Country } from './country.model';

export class Region {
  id: number;
  name: string;
  country?: Country;
}
