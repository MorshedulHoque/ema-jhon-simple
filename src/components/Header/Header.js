import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const usePrevious = value => {
    const prev = useRef();
    useEffect( () => {
        console.log(value);
        prev.current = value;
    }, [value])
    return [prev.current];
}

const Header = () => {
    const auth = useAuth();
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <nav>
            <a href="/shop">Shop</a>
            <a href="/review">Order Review</a>
            <a href="/manage">Manage Innventory</a>
            {
                auth.user && 
                <span style={{color: 'orange'}}>{auth.user.name}</span>
               
            }
            {
                 auth.user ?  <a href="/login">Sign Out</a>
                 : <a href="/login">Sign In</a>
            }
            </nav>
        </div>
        
    );
};

export default Header;