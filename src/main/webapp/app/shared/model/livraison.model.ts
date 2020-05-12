import { Moment } from 'moment';
import { CatClient } from 'app/shared/model/enumerations/cat-client.model';

export interface ILivraison {
  id?: number;
  categorieClient?: CatClient;
  intervalValeur?: number;
  frais?: number;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  zoneNom?: string;
  zoneId?: number;
}

export const defaultValue: Readonly<ILivraison> = {};
