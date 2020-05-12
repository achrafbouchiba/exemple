import { Moment } from 'moment';

export interface IStock {
  id?: number;
  stockPhysique?: number;
  stockDisponible?: number;
  stockReserve?: number;
  stockCommande?: number;
  derniereEntre?: Moment;
  derniereSortie?: Moment;
  alerteStock?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  refProduitReference?: string;
  refProduitId?: number;
  idCategorieNom?: string;
  idCategorieId?: number;
  idSousCategorieNom?: string;
  idSousCategorieId?: number;
}

export const defaultValue: Readonly<IStock> = {
  alerteStock: false
};
