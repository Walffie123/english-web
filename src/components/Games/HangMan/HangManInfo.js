import React from 'react';
import Button from '../../Button/btn';
import styles from './stylehome.module.css';
const HangManInfo = () => {
    return (
        <div className={styles.hangmaininfo}>
            <h2>Welcome to Hang Man game!</h2><br></br>
            <p>Hangman is a classic word-guessing game that is both fun and challenging.
                The objective of the game is to guess the hidden word by guessing one letter
                at a time. Each incorrect guess results in a part of a stick figure being drawn,
                representing the hanging of a man. The game ends either when the word is guessed
                correctly, or when the stick figure is fully drawn and the game is lost.</p>
            <p>To start, press the Enter button below</p>
            <Button>
                <a href="/hangman">Enter</a>
            </Button>
        </div>
    )
}

export default HangManInfo