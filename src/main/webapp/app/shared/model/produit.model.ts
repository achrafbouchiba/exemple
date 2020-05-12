import { Moment } from 'moment';
import { IStock } from 'app/shared/model/stock.model';
import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { IRemise } from 'app/shared/model/remise.model';
import { SourcePrd } from 'app/shared/model/enumerations/source-prd.model';

export interface IProduit {
  id?: number;
  reference?: string;
  nom?: string;
  codeBarre?: number;
  description?: string;
  etat?: boolean;
  marque?: string;
  nature?: string;
  stockMinimum?: number;
  quantiteVenteMax?: number;
  horsStock?: boolean;
  gereEnStock?: boolean;
  datePremption?: Moment;
  prixHT?: number;
  tauxTVA?: number;
  prixTTC?: number;
  sourceProduit?: SourcePrd;
  rating?: string;
  remise?: number;
  imageContentType?: string;
  image?: any;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  stocks?: IStock[];
  mouvementStocks?: IMouvementStock[];
  commandeLignes?: ICommandeLignes[];
  remises?: IRemise[];
  sousCategorieNom?: string;
  sousCategorieId?: number;
  uniteUnite?: string;
  uniteId?: number;
}

export const defaultValue: Readonly<IProduit> = {
  etat: false,
  horsStock: false,
  gereEnStock: false
};
