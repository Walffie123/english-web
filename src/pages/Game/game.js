import Button from '~/components/Button/btn';
function Game() {
    return (
        <div className="game-content">
            <h1>Game</h1>
            <Button href={'/wordassintro'}>Word Association</Button>
            <Button href={'/flashcard'}>Flash Card</Button>
        </div>
    );
}

export default Game;
