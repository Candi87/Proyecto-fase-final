import { AiOutlineLike } from 'react-icons/ai';
import './button.css';

function Button({ id, children, onClick }) {
    return (
        <button data-testid={id} onClick={onClick} className="like">
            {children}
            <AiOutlineLike />
        </button>
    );
}

export { Button };
