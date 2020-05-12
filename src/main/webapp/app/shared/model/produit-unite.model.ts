import { IProduit } from 'app/shared/model/produit.model';

export interface IProduitUnite {
  id?: number;
  unite?: string;
  produits?: IProduit[];
}

export const defaultValue: Readonly<IProduitUnite> = {};
