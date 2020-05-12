import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Dropdown} from 'primereact/dropdown';
interface DropDownProps {
    menu: any[],
    dropdown:any
};

export const DropDown = (props: DropDownProps) => {

    const citySelectItems = [
        {label: 'New York', value: 'NY'},
        {label: 'Rome', value: 'RM'},
        {label: 'London', value: 'LDN'},
        {label: 'Istanbul', value: 'IST'},
        {label: 'Paris', value: 'PRS'}
    ];
    return (
        <div>
            <div>
            <FontAwesomeIcon  icon="list" onClick={this.props.dropdown} />
        </div>
        <Dropdown value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="Select a City"/>

        <div className="dropdown-wrapper">
            <ul>
                <li>klk</li>
                <li>klk</li>
                <li>klk</li>
                <li>klk</li>
            </ul>
        </div>
        </div>
        
        

    )
};


