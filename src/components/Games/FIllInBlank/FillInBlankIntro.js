import React, { useState } from 'react';
import './FillInTheBlankIntro.css';
import Button from '~/components/Button/btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowRight, faPlay, faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons';


function FillInTheBlankIntro() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token);
    const [showLevelButtons, setShowLevelButtons] = useState(false);

    const handlePlayNowClick = () => {
        setShowLevelButtons(true);
    }

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
                <div className="play-now-container">
                    <Button className={'fillintro-btn'} onClick={handlePlayNowClick}>
                        <FontAwesomeIcon icon={faPlay} /> Play Now
                    </Button>

                    {showLevelButtons && (
                        <div>
                            <p style={{ color: 'white' , margin: '20px'}}>Choose your level</p>
                            <Button href={`/fillinblank/1`}>Easy </Button>
                            <Button href={`/fillinblank/2`}>Medium </Button>
                            <Button href={`/fillinblank/3`}>Hard </Button>
                            <Button href={`/fillinblank/4`}>Very Hard </Button>
                        </div>
                        
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default FillInTheBlankIntro;
