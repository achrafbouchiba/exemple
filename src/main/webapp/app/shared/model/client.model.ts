import { Moment } from 'moment';
import { IAdresse } from 'app/shared/model/adresse.model';
import { ICommande } from 'app/shared/model/commande.model';
import { Civilite } from 'app/shared/model/enumerations/civilite.model';
import { RegMod } from 'app/shared/model/enumerations/reg-mod.model';
import { CatClient } from 'app/shared/model/enumerations/cat-client.model';

export interface IClient {
  id?: number;
  civilite?: Civilite;
  nom?: string;
  prenom?: string;
  dateDeNaissance?: Moment;
  email?: string;
  mobile?: number;
  reglement?: RegMod;
  etat?: boolean;
  derniereVisite?: Moment;
  totalAchat?: number;
  categorie?: CatClient;
  pointsFidelite?: number;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  adresses?: IAdresse[];
  commandes?: ICommande[];
}

export const defaultValue: Readonly<IClient> = {
  etat: false
};
