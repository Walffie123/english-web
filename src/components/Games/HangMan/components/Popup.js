import React, { useEffect } from 'react';
import { checkWin, checkFinish } from '../helpers/helpers';
import '../style.css';
const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, next, score, words, len, reset }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let showScore = '';
    let playable = true;
    let status = checkWin(correctLetters, wrongLetters, selectedWord, words);

    if (checkWin(correctLetters, wrongLetters, selectedWord, words) == 'win') {
        finalMessage = 'Congratulations! You won!';
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord, words) == 'lose') {
        finalMessage = 'Unfortunately you lose.';
        finalMessageRevealWord = `... the word was: ${selectedWord}`;
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord, words) == 'finishwin') {
        finalMessage = 'Congratulations! You won!';
        showScore = `Your score is: ${score + 1}/${words.length}`;
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord, words) == 'finishlose') {
        finalMessage = 'Unfortunately you lose. ';
        finalMessageRevealWord = `... the word was: ${selectedWord}`;
        showScore = `Your score is: ${score}/${words.length}`;
        playable = false;
    }

    useEffect(() => setPlayable(playable));
    return (
        <div>
            <div class="popup-container" style={
                finalMessage != '' ? { display: 'flex' }
                    : {}}>
                <div class="popup">
                    <h2>{finalMessage}</h2>
                    <h3>{finalMessageRevealWord}</h3>
                    <h3>{showScore}</h3>
                    {checkWin(correctLetters, wrongLetters, selectedWord, words) === 'finishwin' ?
                        <button onClick={reset}>Reset</button> :
                        checkWin(correctLetters, wrongLetters, selectedWord, words) === 'finishlose' ? <div>
                            <button onClick={reset}>Reset</button></div> :
                            <button onClick={next}>Next</button>
                    }
                </div>
            </div>
        </div>
    )


}

export default Popup