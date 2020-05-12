import { Moment } from 'moment';
import { IMouvementStock } from 'app/shared/model/mouvement-stock.model';
import { ICommandeLignes } from 'app/shared/model/commande-lignes.model';
import { StatCmd } from 'app/shared/model/enumerations/stat-cmd.model';
import { NaturePiece } from 'app/shared/model/enumerations/nature-piece.model';

export interface ICommande {
  id?: number;
  reference?: string;
  date?: Moment;
  statut?: StatCmd;
  naturePiece?: NaturePiece;
  totalHT?: number;
  totalTVA?: number;
  totalRemise?: number;
  totTTC?: number;
  zone?: string;
  dateLivraison?: Moment;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  mouvementStocks?: IMouvementStock[];
  commandeLignes?: ICommandeLignes[];
  idClientId?: number;
  idAdresseId?: number;
}

export const defaultValue: Readonly<ICommande> = {};
