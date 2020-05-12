import './sidebar.scss';
import React, { useState } from 'react';
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { SideEntities } from '../menus/side-entities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* 
export interface SidebarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
} */


const Sidebar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
    function headerToggle(x){
      return document.getElementById('root').style["margin-left"] = x;
    }
    function sidebarToggle(){
      if(document.getElementById('sidebar').style["width"] !=="50px"){
        document.getElementById('sidebar').style["width"] = "50px";
        setTimeout(headerToggle("2.5%"), 5000);
      }
      else{
        document.getElementById('sidebar').style["width"] = "269px";
        setTimeout(headerToggle("20%"), 5000);
      }
      
      
    }
 
    return (
      
      <Nav id="sidebar" className="bg-light sidebar">
        <a onClick={sidebarToggle}><FontAwesomeIcon className="toggle-icon" icon="list" /></a>
          <div className="menu">
            <ul>
              <div className="navitem">
                <SideEntities />
              </div>
            </ul>
          </div>
      </Nav>
    )
}





export default Sidebar;
