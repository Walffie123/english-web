import { Link } from 'react-router-dom';
import Button from '~/components/Button/Btn';
function Game() {
    return (
        <div className="game-content">
            <h1>Game</h1>
            <Button href={'/wordassintro'}>Word Association</Button>
        </div>
    );
}

export default Game;
