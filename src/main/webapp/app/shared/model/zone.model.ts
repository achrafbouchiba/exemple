import { Moment } from 'moment';
import { IAdresse } from 'app/shared/model/adresse.model';
import { ILivraison } from 'app/shared/model/livraison.model';

export interface IZone {
  id?: number;
  nom?: string;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  adresses?: IAdresse[];
  livraisons?: ILivraison[];
}

export const defaultValue: Readonly<IZone> = {};
