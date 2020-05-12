import { Moment } from 'moment';
import { CatClient } from 'app/shared/model/enumerations/cat-client.model';

export interface IRemise {
  id?: number;
  categorieClient?: CatClient;
  prix?: number;
  remise?: number;
  cumulable?: boolean;
  debutPromo?: Moment;
  finPromo?: Moment;
  etat?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  refProduitReference?: string;
  refProduitId?: number;
  sousCategorieNom?: string;
  sousCategorieId?: number;
  categorieNom?: string;
  categorieId?: number;
}

export const defaultValue: Readonly<IRemise> = {
  cumulable: false,
  etat: false
};
