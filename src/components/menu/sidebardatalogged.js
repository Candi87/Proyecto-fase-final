import React from 'react';

import { CgProfile } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { AiOutlineFire } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const idUsuario = sessionStorage.getItem('idusuario');
export const SidebarDataLogged = [
    {
        title: 'Perfil',
        path: `/perfil/${idUsuario}`,
        icon: <CgProfile />,
        cName: 'nav-text',
    },

    {
        title: 'Buscar',
        path: '/search',
        icon: <BsSearch />,
        cName: 'nav-text',
    },

    {
        title: 'Tendencias',
        path: '/tendencias',
        icon: <AiOutlineFire />,
        cName: 'nav-text',
    },

    {
        title: 'Contacto',
        path: '/',
        icon: <HiOutlineMail />,
        cName: 'nav-text',
    },

    {
        title: 'Logout',
        path: '/login',
        icon: <RiLogoutBoxLine />,
        cName: 'nav-text',
    },
];
