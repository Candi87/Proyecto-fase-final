import React from 'react';
import axios from 'axios';
import { useState } from 'react';

import { ImWarning } from 'react-icons/im';
import './modaleditprofile.css';
import imagennoperfil from '../../assets/imagennoperfil.png';

function EditCall() {
    const idUsuario = sessionStorage.getItem('idusuario');
    const tokenInfo = sessionStorage.getItem('token');
    const [userInfo, setUserInfo] = useState();

    // Solicitud GET USERINFO
    if (!userInfo) {
        async function getUserInfo() {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:4000/usuarios/${idUsuario}`,
                    headers: {
                        authorization: tokenInfo,
                        'Content-Type': 'application/json',
                    },
                });
                setUserInfo(response.data.informacion);
            } catch (error) {}
        }
        getUserInfo();
    }

    const [error, setError] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    function onSelectEmail(event) {
        const email = event.target.value;
        setEmail(email);
    }
    function onSelectusername(event) {
        const username = event.target.value;
        setUsername(username);
    }
    function onSelectOldPassword(event) {
        const password = event.target.value;
        setOldPassword(password);
    }
    function onSelectNewPassword(event) {
        const newpassword = event.target.value;
        setNewPassword(newpassword);
    }
    async function editUsername(event) {
        event.preventDefault();
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    username: username, // This is the body part
                },
            });
        } catch (error) {
            setError(error);
        }
    }
    async function editMail(event) {
        event.preventDefault();
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email,
                },
            });
        } catch (error) {
            setError(error);
        }
    }
    async function editPassword(event) {
        event.preventDefault();
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}/password`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
            });
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="btn-group">
            <div>
                <div className="main_profile_avatar">
                    {userInfo && (
                        <div>
                            <img
                                className="photo-perfil-modal"
                                src={imagennoperfil}
                                alt="Foto perfil"
                            ></img>

                            <p className="username-modal-edit">
                                {userInfo.name}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <button
                type="button"
                className="open-modal"
                data-open="changenickname"
            >
                Cambiar nombre
            </button>
            <button
                type="button"
                className="open-modal"
                data-open="changeemail"
            >
                Cambiar email
            </button>
            <button
                type="button"
                className="open-modal"
                data-open="changepassword"
            >
                Cambiar contraseña
            </button>

            <div className="modal" id="changeemail">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar email
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        <p className="instructions">
                            Para hacer cambios introduce primero el email, y
                            para confirmar el cambio introduce tu contraseña
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="email">
                                <input
                                    type="email"
                                    onChange={onSelectEmail}
                                    placeholder="Introduce el nuevo email"
                                    className="change"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Contraseña
                                <input
                                    type="password"
                                    onChange={onSelectOldPassword}
                                    className="change"
                                    placeholder="Introduce la contraseña"
                                />
                            </label>
                            {error && (
                                <div className="uploadimage_error_label">
                                    <ImWarning />
                                    {error}
                                </div>
                            )}
                            <input
                                className="upload-changes"
                                type="submit"
                                value="Subir"
                                onClick={editMail}
                            />
                        </form>
                    </section>
                </div>
            </div>

            <div className="modal" id="changenickname">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar nickname
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        <p className="instructions">
                            Para hacer cambios introduce primero el nombre, y
                            para confirmar el cambio introduce tu contraseña
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="username">
                                Nombre
                                <input
                                    type="text"
                                    className="change"
                                    onChange={onSelectusername}
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Contraseña
                                <input
                                    className="change"
                                    type="password"
                                    onChange={onSelectOldPassword}
                                    placeholder="Introduce la contraseña"
                                />
                            </label>
                            {error && (
                                <div className="uploadimage_error_label">
                                    <ImWarning />
                                    {error}
                                </div>
                            )}
                            <input
                                className="upload-changes"
                                type="submit"
                                value="Subir"
                                onClick={editUsername}
                            />
                        </form>
                    </section>
                </div>
            </div>
            <div className="modal" id="changepassword">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar password
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        <p className="instructions">
                            Para hacer cambios introduce primero la contraseña,
                            y para confirmar el cambio introduce tu nueva
                            contraseña
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="email">
                                Contraseña actual
                                <input
                                    type="password"
                                    onChange={onSelectOldPassword}
                                    placeholder="Introduce tu contraseña"
                                    className="change"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Nueva contraseña
                                <input
                                    type="password"
                                    onChange={onSelectNewPassword}
                                    placeholder="Introduce la nueva contraseña"
                                    className="change"
                                />
                            </label>
                            {error && (
                                <div className="uploadimage_error_label">
                                    <ImWarning />
                                    {error}
                                </div>
                            )}
                            <input
                                className="upload-changes"
                                type="submit"
                                value="Subir"
                                onClick={editPassword}
                            />
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default EditCall;
