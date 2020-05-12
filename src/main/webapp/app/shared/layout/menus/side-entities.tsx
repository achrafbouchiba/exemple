import React from 'react';
import './side-entities.scss';
import { NavLink as Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* const menu = [];
function dropdown(e) {
    console.log(e.target);
} */
export const SideEntities = props => (
    
    <div className="side-nav-items-wrapper">
        <ul>
            <div className="side-nav-menu-item">
                <NavLink  to="/categorie" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Categorie</span>
                    
                </NavLink>
                {/* <DropDown menu={menu} dropdown={dropdown}></DropDown> */}
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/sous-categorie" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Sous Categorie</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/produit" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="asterisk" /><span className="title">Produit</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/prod-enumeration" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Prod Enum</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/produit-unite" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Produit unité</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/stock" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Stock</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/mouvement-stock" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Mouvement Stock</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/client" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Client</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/adresse" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Adresse</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/commande" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Commande</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/commande-lignes" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Commande lignes</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/zone" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Zone</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/livraison" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Livraison</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/code-postaux" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Code postaux</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/images" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Images</span>
                </NavLink>
            </div>
            <div className="side-nav-menu-item">
                <NavLink  to="/remise" className="d-flex align-items-center">
                    <FontAwesomeIcon icon="list" /><span className="title">Remise</span>
                </NavLink>
            </div>


        </ul>
    </div>
);









 

/* const SideEntities = (props) => {
    let menu = [];
    function dropdown() {
        
    }

    return (
        <div className="side-nav-items-wrapper">
            <ul>
                <div className="side-nav-menu-item">
                    <NavLink to="/categorie" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Categorie</span><span onClick={dropdown}></span><FontAwesomeIcon icon="list" />

                    </NavLink>
                    <DropDown menu={menu}></DropDown>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/sous-categorie" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Sous Categorie</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/produit" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="asterisk" /><span className="title">Produit</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/prod-enumeration" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Prod Enum</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/produit-unite" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Produit unité</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/stock" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Stock</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/mouvement-stock" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Mouvement Stock</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/client" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Client</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/adresse" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Adresse</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/commande" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Commande</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/commande-lignes" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Commande lignes</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/zone" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Zone</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/livraison" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Livraison</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/code-postaux" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Code postaux</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/images" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Images</span>
                    </NavLink>
                </div>
                <div className="side-nav-menu-item">
                    <NavLink to="/remise" className="d-flex align-items-center">
                        <FontAwesomeIcon icon="list" /><span className="title">Remise</span>
                    </NavLink>
                </div>


            </ul>
        </div>

    )
}
export default SideEntities; */