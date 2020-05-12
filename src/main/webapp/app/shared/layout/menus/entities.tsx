import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/categorie">
      Categorie
    </MenuItem>
    <MenuItem icon="asterisk" to="/sous-categorie">
      Sous Categorie
    </MenuItem>
    <MenuItem icon="asterisk" to="/produit">
      Produit
    </MenuItem>
    <MenuItem icon="asterisk" to="/prod-enumeration">
      Prod Enumeration
    </MenuItem>
    <MenuItem icon="asterisk" to="/produit-unite">
      Produit Unite
    </MenuItem>
    <MenuItem icon="asterisk" to="/stock">
      Stock
    </MenuItem>
    <MenuItem icon="asterisk" to="/mouvement-stock">
      Mouvement Stock
    </MenuItem>
    <MenuItem icon="asterisk" to="/client">
      Client
    </MenuItem>
    <MenuItem icon="asterisk" to="/adresse">
      Adresse
    </MenuItem>
    <MenuItem icon="asterisk" to="/gestion-fidelite">
      Gestion Fidelite
    </MenuItem>
    <MenuItem icon="asterisk" to="/commande">
      Commande
    </MenuItem>
    <MenuItem icon="asterisk" to="/commande-lignes">
      Commande Lignes
    </MenuItem>
    <MenuItem icon="asterisk" to="/zone">
      Zone
    </MenuItem>
    <MenuItem icon="asterisk" to="/livraison">
      Livraison
    </MenuItem>
    <MenuItem icon="asterisk" to="/code-postaux">
      Code Postaux
    </MenuItem>
    <MenuItem icon="asterisk" to="/remise">
      Remise
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
