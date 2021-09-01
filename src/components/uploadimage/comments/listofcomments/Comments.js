import './comments.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import imagennoperfil from '../../../assets/imagennoperfil.jpg';

function Comments({ id, idImagen, fechaCreacion, comentario, idUsuario }) {
    const [userCommentInfo, setUserCommentInfo] = useState([]);
    let tokenInfo = sessionStorage.getItem('token');
    async function getUserCommentInfo() {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
            });
            setUserCommentInfo(response.data.informacion);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(
        function () {
            //Llamamos al fetch y seteamos los resultados en pase al keyword
            getUserCommentInfo();
        },

        [, id]
    );
    console.log('user log comment : ', userCommentInfo);

    return (
        <section key={id} className='comments'>
            <div className='userinfoavatar'>
                <img
                    src={
                        userCommentInfo.fotoperfil ===
                        'http://localhost:4000/uploads/null'
                            ? imagennoperfil
                            : userCommentInfo.fotoperfil
                    }
                    alt=''
                    className='miniavatar'
                ></img>
                <a href={`/perfil/${idUsuario}`} className='comments_username'>
                    {userCommentInfo.nickname}
                </a>
            </div>
            <p className='comments_comment'>{comentario}</p>
            <p className='comments_date'>{fechaCreacion}</p>
        </section>
    );
}

export default Comments;
