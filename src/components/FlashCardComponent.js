import { FlashcardArray } from 'react-quizlet-flashcard';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { click } from '@testing-library/user-event/dist/click';
import { render } from '@testing-library/react';

export default function FlashCardComponent(props) {
    const [cards, setCards] = useState([]);
    const [starredIds, setStarredIds] = useState([]);
    const [unStarredIds, setUnStarredIds] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [currentCard, setCurrentCard] = useState(1);
    const [currentStarredCard, setCurrentStarredCard] = useState(1);
    const [starredCards, setStarredCards] = useState([]);
    const [loadStarredCards, setLoadStarredCards] = useState(false);
    // const [clickStar, setClickStar] = useState(false);
    const controlRef = useRef({});

    useEffect(() => {
        loadCards();
    }, [shuffle, loadStarredCards]);
    const loadCards = async () => {
        const result = await axios.get('http://localhost:8080/loadFlashCard');
        const newCards = result.data.map((card, index) => ({
            frontHTML: (
                <div>
                    <h3> {card.frontHTML}</h3>
                </div>
            ),
            backHTML: (
                <div>
                    <h3>{card.backHTML}</h3>
                </div>
            ),

            id: index + 1,
        }));
        // console.log(newCards);
        if (loadStarredCards === true) {
            let filteredCards = newCards;
            if (starredIds.length >= 0) {
                filteredCards = newCards.filter((card) => starredIds.includes(card.id));
            }
            setStarredCards(filteredCards);
            controlRef.current.resetArray();
        } else {
            setCards(newCards);
            controlRef.current.resetArray();
        }
        if (shuffle) {
            newCards.sort(() => Math.random() - 0.5);
        }
    };

    const handleShuffleClick = () => {
        setShuffle(!shuffle);
    };

    const handleStarClick = (id) => {
        if (starredIds.includes(id)) {
            const newStarredIds = starredIds.filter((starredId) => starredId !== id);
            setStarredIds(newStarredIds);
        } else {
            setStarredIds([...starredIds, id]);
        }
        // setClickStar(!clickStar);
    };
    console.log(starredIds);
    // starredCards.map((card) => console.log(card.id));
    console.log(currentStarredCard);

    const handleLoadStarredCardsOne = () => {
        console.log('loadStarredCards: ' + loadStarredCards)      
        if (loadStarredCards === false && !starredIds.includes(currentStarredCard)){
            setCurrentCard(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
        }
        else if(loadStarredCards === false && starredIds.includes(currentStarredCard)){
            setCurrentCard(starredIds[0]);
        }
        else{
            setCurrentCard(starredIds[0])
        }
        setLoadStarredCards(!loadStarredCards);
    };
    const handleLoadStarredCardsTwo = () => {
        console.log('loadStarredCards: ' + loadStarredCards)
        if (loadStarredCards === true && !starredIds.includes(currentCard)){
            setCurrentStarredCard(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
        }
        else if (loadStarredCards === true && starredIds.includes(currentCard)){
            setCurrentStarredCard(starredIds[0]);
        }
        else{
            setCurrentCard(starredIds[0])
        }
        setLoadStarredCards(!loadStarredCards);
    };

    return (
        <div className="container">
            <div className="row">
                {!loadStarredCards && (
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div
                                className="col-12"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FlashcardArray
                                    cards={cards}
                                    frontContentStyle={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    backContentStyle={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onCardChange={(id, index) => {
                                        setCurrentCard(id);
                                        console.log('Current: ' + id);
                                    }}
                                    forwardRef={controlRef}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <div
                                        style={{
                                            color: shuffle ? 'orange' : 'black',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faShuffle} onClick={handleShuffleClick} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <div
                                            style={{
                                                color: starredIds.includes(currentCard) ? 'orange' : 'black',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faLightbulb}
                                                onClick={() => handleStarClick(currentCard)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <FontAwesomeIcon icon={faEye} onClick={handleLoadStarredCardsOne} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loadStarredCards && (
                    <div className="col-md-12">
                        <div
                            className="col-12"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FlashcardArray
                                cards={starredCards}
                                frontContentStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                backContentStyle={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onCardChange={(id, index) => {
                                    setCurrentStarredCard(id);
                                    console.log('Starred: ' + id);
                                }}
                                forwardRef={controlRef}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <div
                                        style={{
                                            color: shuffle ? 'orange' : 'black',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faShuffle} onClick={handleShuffleClick} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        {/* ${starredIds.includes(id) ? ' starred' : ''} */}
                                        <div
                                            style={{
                                                color: starredIds.includes(currentStarredCard) ? 'orange' : 'black',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faLightbulb}
                                                onClick={() => handleStarClick(currentStarredCard)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <FontAwesomeIcon icon={faEye} onClick={ handleLoadStarredCardsTwo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
