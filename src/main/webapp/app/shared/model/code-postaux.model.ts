import { Moment } from 'moment';
import { IAdresse } from 'app/shared/model/adresse.model';

export interface ICodePostaux {
  id?: number;
  gouvernorat?: string;
  ville?: string;
  localite?: string;
  codePostal?: number;
  zone?: string;
  modifieLe?: Moment;
  modifiePar?: string;
  adresses?: IAdresse[];
}

export const defaultValue: Readonly<ICodePostaux> = {};
