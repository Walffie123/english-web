import React from 'react';
import './FillInTheBlankIntro.css';
import Button from '~/components/Button/btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowRight, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function FillInTheBlankIntro() {
    return (
        <div className="fill-container">
            <div className='back'>
                <Button back href={'/game'}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </Button>
            </div>

            <h1 className="gname">Fill in the Blank Game</h1>
            <div className="fill-in-the-blank-intro">
                <p className="animate-p">
                    Welcome to our Fill in the Blank game! This game is a fun and educational way to test your knowledge
                    on a variety of topics. The rules are simple. You will be presented with a sentence or paragraph
                    with a missing word or words. Your task is to fill in the missing word or words to complete the
                    sentence or paragraph. There are different levels of difficulty, and each level will have a
                    different number of missing words to fill in. You can choose the level that suits your skill level.
                    Are you ready to play? Click the button below to get started!
                </p>
            </div>
            <div className="plays">
                <Button href={'/fillinblank/1'}>
                    <FontAwesomeIcon icon={faPlay} /> Play Now
                </Button>
            </div>
        </div>
    );
}

export default FillInTheBlankIntro;
