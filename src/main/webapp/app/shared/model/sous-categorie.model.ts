import { Moment } from 'moment';
import { IProduit } from 'app/shared/model/produit.model';
import { IStock } from 'app/shared/model/stock.model';
import { IRemise } from 'app/shared/model/remise.model';

export interface ISousCategorie {
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
  produits?: IProduit[];
  stocks?: IStock[];
  remises?: IRemise[];
  categorieNom?: string;
  categorieId?: number;
}

export const defaultValue: Readonly<ISousCategorie> = {
  etat: false
};
