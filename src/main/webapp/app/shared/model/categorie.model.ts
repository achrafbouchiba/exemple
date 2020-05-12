import { Moment } from 'moment';
import { ISousCategorie } from 'app/shared/model/sous-categorie.model';
import { IStock } from 'app/shared/model/stock.model';
import { IRemise } from 'app/shared/model/remise.model';

export interface ICategorie {
  id?: number;
  nom?: string;
  description?: string;
  position?: number;
  etat?: boolean;
  imageContentType?: string;
  image?: any;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  sousCategories?: ISousCategorie[];
  stocks?: IStock[];
  remises?: IRemise[];
}

export const defaultValue: Readonly<ICategorie> = {
  etat: false
};
