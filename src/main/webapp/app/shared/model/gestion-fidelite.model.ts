import { Moment } from 'moment';
import { Devise } from 'app/shared/model/enumerations/devise.model';

export interface IGestionFidelite {
  id?: number;
  nom?: string;
  points?: number;
  valeur?: number;
  clientsilvermin?: number;
  clientsilvermax?: number;
  clientgoldmin?: number;
  clientgoldmax?: number;
  clientpremiummin?: number;
  clientpremiummax?: number;
  devise?: Devise;
  etat?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifieLe?: Moment;
  modifiePar?: string;
}

export const defaultValue: Readonly<IGestionFidelite> = {
  etat: false
};
