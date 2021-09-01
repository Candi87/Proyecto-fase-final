import { useLocation } from 'wouter';
export default function Result({ id, idUsuario, descripcion, url, likes }) {
    const [path, setPath] = useLocation();
    const handleImage = (event) => {
        event.preventDefault();
        setPath(`/uploads/${id}`);
    };

    return (
        <a href={`/photos/${id}`} className='Result'>
            {/* <p>ID Imagen: {id}</p>
            <p>ID Usuario: {idUsuario}</p> */}
            <img src={url} alt='Imágen no disponible' />
            {/* <p>Descripción: {descripcion}</p>
            <p>Likes: {likes}</p> */}
        </a>
    );
}
