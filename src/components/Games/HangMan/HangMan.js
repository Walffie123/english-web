import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Score from './components/Score';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { showNotification as show, checkWin } from './helpers/helpers';
import './style.css';

export default function HangMan(props) {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (props.selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable, props.selectedWord])

  function next() {
    if (checkWin(correctLetters, wrongLetters, props.selectedWord, props.words) === 'win') {
      const newScore = props.score + 1;
      props.onScoreChange(newScore);
    }

    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);
    props.onNext();
  }

  function reset() {
    props.onReset();
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

  }
  console.log(showNotification);
  return (
    <div className="hangmain">
      <Header />
      <>{props.question}</>
      <>{props.data}</>
      <Score score={props.score} len={props.len} words={props.words} />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={props.selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters}
        selectedWord={props.selectedWord}
        setPlayable={setPlayable} next={next} score={props.score}
        words={props.words} len={props.len} reset={reset} />
      <Notification showNotification={showNotification} />
    </div>
  );
}
