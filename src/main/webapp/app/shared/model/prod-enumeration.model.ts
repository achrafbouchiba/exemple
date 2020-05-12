import { ProdEnum } from 'app/shared/model/enumerations/prod-enum.model';

export interface IProdEnumeration {
  id?: number;
  type?: ProdEnum;
  nom?: string;
}

export const defaultValue: Readonly<IProdEnumeration> = {};
