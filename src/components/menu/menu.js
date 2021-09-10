import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { SidebarData } from './sidebardata';
import { SidebarDataLogged } from './sidebardatalogged';
import './menu.css';

import { RiMenuFoldFill } from 'react-icons/ri';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import HelperMenu from '../helperMenu/HelperMenu';
function Menu() {
    const [sidebar, setSidebar] = useState(false);
    const token = sessionStorage.getItem('token');
    const idUsuario = sessionStorage.getItem('idusuario');
    const showSidebar = () => setSidebar(!sidebar);
    if (token) {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <RiMenuUnfoldFill
                            className="icono-opciones"
                            onClick={showSidebar}
                        />
                        <p onClick={showSidebar} className="btn-letter">
                            MENÚ
                        </p>
                    </Link>

                    <h1>A GUÍA DO CAMIÑO</h1>

                    <HelperMenu />
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <RiMenuFoldFill className="icono-cerrar" />
                                <p className="btn-letter2">CERRAR MENÚ</p>
                            </Link>
                        </li>
                        <li className="list">
                            <a href={`/perfil/${idUsuario}`}>
                                <p className="menu-options">Perfil</p>
                            </a>
                        </li>
                        <li className="list">
                            <a href={`/search`}>
                                <p className="menu-options">Buscar</p>
                            </a>
                        </li>

                        <li className="list">
                            <a href={`/tendencias`}>
                                <p className="menu-options">Tendencias</p>
                            </a>
                        </li>

                        <li className="list">
                            <a href={`/Contacto`}>
                                <p className="menu-options">Contacto</p>
                            </a>
                        </li>

                        <li className="list">
                            <a href={`/login`}>
                                <p className="menu-options">Desconectar</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        );
    } else {
        return (
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <RiMenuUnfoldFill
                            className="icono-opciones"
                            onClick={showSidebar}
                        />
                    </Link>

                    <h1>A GUÍA DO CAMIÑO</h1>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <RiMenuFoldFill
                                    onClick={showSidebar}
                                    className="icono-cerrar"
                                />
                            </Link>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        );
    }
}

export default Menu;
