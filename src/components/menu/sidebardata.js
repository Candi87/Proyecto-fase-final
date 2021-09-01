import React from 'react';

import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineFire } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Login',
        path: '/login',
        icon: <BsSearch />,
        cName: 'nav-text',
    },
    {
        title: 'Registro',
        path: '/register',
        icon: <BsSearch />,
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
];
