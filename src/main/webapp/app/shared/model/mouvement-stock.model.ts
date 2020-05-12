import { Moment } from 'moment';
import { TypeMvt } from 'app/shared/model/enumerations/type-mvt.model';

export interface IMouvementStock {
  id?: number;
  type?: TypeMvt;
  date?: Moment;
  sens?: number;
  quantite?: number;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  refProduitReference?: string;
  refProduitId?: number;
  refCommandeReference?: string;
  refCommandeId?: number;
}

export const defaultValue: Readonly<IMouvementStock> = {};
