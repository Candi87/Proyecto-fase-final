import './photowall.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';

import ListOfComments from '../../components/comments/listofcomments/ListOfComments';
import ListOfImages from '../../components/listofimages/ListofImages';
import Menu from '../../components/menu/menu';
import getComment from '../../services/getComment';


function PhotoWall() {
    const { id } = useParams();
    const keyword = id;
    const [search, setSearch] = useState([]);

    const [comentario, setComments] = useState('');
    let [addComment, setAddComment] = useState({ comentario });
    let [step, setStep] = useState(1);

    let token = sessionStorage.getItem('token');
    let idUsuario = sessionStorage.getItem('idusuario');

    function onSubmitComments(event) {
        event.preventDefault();

        console.log('STEEEEEEEEEEEEEEEEEEEEEEEP:    ', step);
        async function performComment() {
            const response = await fetch(
                `http://localhost:4000/usuarios/${idUsuario}/photos/${id}/comment`,
                {
                    method: 'POST',

                    headers: {
                        authorization: token,

                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        comentario,
                    }),
                }
            );
            const data = await response.json();
            addComment = data.data;
            if (response.ok) {
                setStep(step + 1);
            }
        }
        setComments('');
        performComment();
    }

    useEffect(
        function () {
            //Llamamos al fetch y seteamos los resultados en pase al keyword
            getComment({ keyword }).then((results) => {
                setSearch(results);
            });
        },

        [keyword, step]
    );



    return (
        <div>
            <Menu />
            <div className="grid_photowall">
                <ListOfImages keyword={keyword} />
                <ListOfComments search={search} />
                <form onSubmit={onSubmitComments} className="imagesWall_comments_new">
                        <textarea
                            className="textarea-comments"
                            type='text'
                            placeholder='Aquí podrás comentar las fotos que más te gusten'
                            value={comentario}
                         onChange={(event) => setComments(event.target.value)}
                        ></textarea>
                        <button 
                         className="comment-button"
                            type='submit'
                            onClick={() => setAddComment(!addComment)}
                            disabled={comentario ? '' : 'comments'}
                        >
                        <IoIosSend />
                        </button>
                </form>
            </div>
        </div>
    );
}
export default PhotoWall;
