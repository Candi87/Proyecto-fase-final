// import React from 'react';

import { useState } from 'react';

// import { ImWarning } from 'react-icons/im';

// import imagennoperfil from '../../assets/imagennoperfil.png';

function EditProfile() {
    const idUsuario = sessionStorage.getItem('idusuario');
    const tokenInfo = sessionStorage.getItem('token');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [repeatPassword, setRepeatPassword] = useState('');
    const [nickname, setNickName] = useState('');

    async function editName() {
        const response = await fetch(
            `http://localhost:4000/usuarios/${idUsuario}`,
            {
                method: 'PUT',
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name,
                }),
            }
        );
        const data = await response.json();
    }
    editName();

    return (
        <label>
            <form>
                <p className="edit-profile-tittle">Nombre</p>
                <input type="text" className="edit-profile"></input>
                <p className="edit-profile-tittle">Contraseña</p>
                <input type="text" className="edit-profile"></input>
                <button>Realizar Cambios</button>
            </form>
        </label>
    );
}
export default EditProfile;

// async function editEmail() {
//         const response = await fetch(
//             `http://localhost:4000/usuarios/${idUsuario}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     authorization: tokenInfo,
//                     'Content-Type': 'application/json',
//                 },

//                 body: JSON.stringify({
//                     email,
//                 }),
//             }
//         );
//         const data = await response.json();
//     }
//     editEmail();
//     editName();
//     async function editNickname() {
//         const response = await fetch(
//             `http://localhost:4000/usuarios/${idUsuario}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     authorization: tokenInfo,
//                     'Content-Type': 'application/json',
//                 },

//                 body: JSON.stringify({
//                     nickname,
//                 }),
//             }
//         );
//         const data = await response.json();
//     }
//     editNickname();
//     async function editPassword() {
//         const response = await fetch(
//             `http://localhost:4000/usuarios/${idUsuario}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     authorization: tokenInfo,
//                     'Content-Type': 'application/json',
//                 },

//                 body: JSON.stringify({
//                     password,
//                 }),
//             }
//         );
//         const data = await response.json();
//     }
//      editPassword()
