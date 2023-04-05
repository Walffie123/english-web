
import Button from '~/components/Button/Btn';
function Game() {
    return (
        <div className="game-content">
            <h1>Game</h1>
            <Button href={'/hangmaninfo'}>Hang Man</Button>
            <Button href={'/wordassintro'}>Word Association</Button>
            <Button href={'/list'}>List</Button>
            <Button href={'/flashcard'}>Flash Card</Button>
        </div>
    );
}

export default Game;