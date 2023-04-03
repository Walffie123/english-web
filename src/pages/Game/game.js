import { Link } from 'react-router-dom';
import Button from '~/components/Button/Btn';
function Game() {
    return (
        <div className="game-content">
            <h1>Game</h1>
            <Button href={'/word'}>Word Association</Button>
            <Button href={'/hangmaninfo'}>Hang Man</Button>
        </div>
    );
}

export default Game;
