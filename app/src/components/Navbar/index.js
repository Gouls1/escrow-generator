import React from 'react';
import './Navbar.css'
import { useEffect, useState } from 'react';


export const Navbar = () => {
    return (
        <nav className="nav">
            <a href="/" className="home">
            Escrow Contracts Generator
            </a>
            <ul>
               <a href="/simple-escrow" className="link">
                Simple Escrow
               </a>
               <a href="/locker" className='link'>
                Locker
               </a>
               <a href="/vesting" className='link'>
                Vesting contract
               </a>
               <a href="/history" className="link">
                History
                </a>
            </ul> 
        </nav>  
    )  
};

export default Navbar;