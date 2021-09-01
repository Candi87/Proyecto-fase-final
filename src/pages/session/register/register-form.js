import { useState } from 'react';
import '../session.css';
import { Link, useHistory } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [nickname, setNickName] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [error, setError] = useState('');

    function onSubmitRegister(event) {
        event.preventDefault();

        async function registerConfirm() {
            const response = await fetch('http://localhost:4000/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    nickname,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            } else {
                setConfirmEmail(
                    `Haz click en el enlace de tu correo para activarte como usuario`
                );
            }
        }
        registerConfirm();
    }

    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">¡ Regístrate ya !</h1>
                </div>
                <div className="register-form">
                    <form onSubmit={onSubmitRegister} className="form">
                        <label className="datos-container">
                            <label className="datos-container">
                                <input
                                    className="input"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    type="text"
                                    placeholder="Ingrese su Nombre y Apellidos"
                                    leyendaError="El usuario tiene que ser min de 4 a 30 gígitos y sólo puede contener letras"
                                />
                                <error>Rellene este campo</error>
                            </label>
                            <input
                                className="input"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="text"
                                placeholder="Ingrese su email"
                            />
                            <error>Error</error>
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                value={nickname}
                                onChange={(event) =>
                                    setNickName(event.target.value)
                                }
                                type="text"
                                placeholder="Ingrese el Nombre de Usuario"
                            />
                            <error>Error</error>
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                type="password"
                                placeholder="Ingrese su Contraseña"
                            />
                            <error>Error</error>
                            <label className="datos-container">
                                <input
                                    className="input"
                                    value={repeatPassword}
                                    onChange={(event) =>
                                        setRepeatPassword(event.target.value)
                                    }
                                    type="password"
                                    placeholder="Repita su Contraseña"
                                />
                                <error>Error</error>
                            </label>
                            <div>
                                <p className="pterminos">
                                    Al hacer clic en Registrar, aceptas nuestros
                                    términos y condiciones.
                                </p>
                                <button className="button-forms" type="submit">
                                    Registrar
                                </button>
                            </div>
                            <Link to="/login" className="links">
                                <p>Ya tengo cuenta</p>
                            </Link>

                            {false && (
                                <div>
                                    <b> Error :</b> Por favor rellena el
                                    formulario correctamente
                                </div>
                            )}
                            {confirmEmail && <div>{confirmEmail} </div>}
                            <p>{error}</p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;
