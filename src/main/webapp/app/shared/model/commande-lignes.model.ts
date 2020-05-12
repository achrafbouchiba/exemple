import { Moment } from 'moment';

export interface ICommandeLignes {
  id?: number;
  quantite?: number;
  prixHT?: number;
  tva?: number;
  prixTTC?: number;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  refCommandeReference?: string;
  refCommandeId?: number;
  refProduitReference?: string;
  refProduitId?: number;
}

export const defaultValue: Readonly<ICommandeLignes> = {};
