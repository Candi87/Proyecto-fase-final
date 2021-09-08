import React from 'react';
import axios from 'axios';
import { useState } from 'react';

import { ImWarning } from 'react-icons/im';
import './modaleditprofile.css';
import './editprofile.css';
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
    console.log('caca', userInfo);

    const [error, setError] = useState();
    let [nombre, setNombre] = useState();
    const [newName, setNewName] = useState();
    const [email, setEmail] = useState();
    const [newEmail, setNewEmail] = useState();
    const [nickname, setNickName] = useState();
    const [newNickname, setNewNickName] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    async function editName(event) {
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    nombre: nombre,
                },
            });
            setNewName();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    async function editNickname(event) {
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    nickname: nickname,
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
            const data = await response.json();
        } catch (error) {
            setError(error);
        }
    }
    function onSubmitChanges() {
        const error = validateChanges(
            nombre,
            newName,
            nickname,
            newNickname,
            email,
            newEmail
        );
        if (error) {
            setError(error);
            return;
        }
    }
    return (
        <div className="btn-group">
            <div className="modal-container-profile">
                <div className="main_profile_avatar">
                    {userInfo && (
                        <div>
                            <img
                                className="trendings-profile-photos"
                                alt="trendings"
                                src={
                                    userInfo.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                }
                            ></img>

                            <p className="username-modal-edit">
                                {nombre === newName ? userInfo.name : newName}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changename"
                >
                    Cambiar nombre
                </button>
                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changenickname"
                >
                    Cambiar Nickname
                </button>

                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changeemail"
                >
                    Cambiar email
                </button>
                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changepassword"
                >
                    Cambiar contraseña
                </button>
            </div>

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
                            Para cambiar el Email deberás introducir el nuevo
                            Email en el siguiente formulario
                        </p>
                        <form
                            className="editprofile_form"
                            onSubmit={onSubmitChanges}
                        >
                            <label className="change-container" for="email">
                                <input
                                    type="email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Introduce el nuevo email"
                                    className="change"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Confirma el Email
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNewEmail(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
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
                                value="Confirmar Cambios"
                                onClick={editMail}
                            />
                        </form>
                    </section>
                </div>
            </div>
            <div className="modal" id="changename">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar Nombre
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
                            Para cambiar el nombre deberás introducir el nuevo
                            nombre en el siguiente formulario
                        </p>
                        <form
                            className="editprofile_form"
                            onSubmit={onSubmitChanges}
                        >
                            <label className="change-container" for="username">
                                Nombre
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNombre(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Confirma el Nombre
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNewName(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>
                            <p>{error}</p>
                            {error && (
                                <div className="uploadimage_error_label">
                                    <ImWarning />
                                    {error}
                                </div>
                            )}
                            <input
                                className="upload-changes"
                                type="submit"
                                value="Confirmar Cambios"
                                onClick={editName}
                            />
                        </form>
                    </section>
                </div>
            </div>

            <div className="modal" id="changenickname">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar Nickname
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
                            Para cambiar el Nickname deberás introducir el nuevo
                            Nickname en el siguiente formulario
                        </p>
                        <form
                            className="editprofile_form"
                            onSubmit={onSubmitChanges}
                        >
                            <label className="change-container" for="nickname">
                                Nickname
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNickName(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Confirma el Nickname
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNewNickName(event.target.value)
                                    }
                                    placeholder="Confirma tu nuevo Nickname"
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
                                value="Confirmar Cambios"
                                onClick={editNickname}
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
                            Para cambiar la contraseña, introduce la antigua
                            contraseña y despues la nueva dos veces para
                            confirmar el cambio
                        </p>
                        <form
                            className="editprofile_form"
                            onSubmit={onSubmitChanges}
                        >
                            <label className="change-container" for="email">
                                Contraseña actual
                                <input
                                    type="password"
                                    onChange={(event) =>
                                        setOldPassword(event.target.value)
                                    }
                                    placeholder="Introduce tu contraseña"
                                    className="change"
                                />
                            </label>
                            <label className="change-container" for="username">
                                Nueva contraseña
                                <input
                                    type="password"
                                    onChange={(event) =>
                                        setNewPassword(event.target.value)
                                    }
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
                                value="Confirmar Cambios"
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
function validateChanges(
    nombre,
    newName,
    nickname,
    newNickname,
    email,
    newEmail
) {
    const isValidName = nombre === newName;
    if (!isValidName) return 'Los Nombres no Coinciden';
    const isValidNickname = nickname === newNickname;
    if (!isValidNickname) return 'Los Nicknames no Coinciden';
    const isValidEmail = email === newEmail;
    if (!isValidEmail) return 'Los Emails no Coinciden';
}
