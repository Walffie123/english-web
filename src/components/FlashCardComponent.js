import { FlashcardArray } from 'react-quizlet-flashcard';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { click } from '@testing-library/user-event/dist/click';

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
            frontHTML: '<h3>' + card.frontHTML + '</h3>',
            backHTML: '<h3>' + card.backHTML + '</h3>',
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
            setUnStarredIds(newStarredIds);
        } else {
            setStarredIds([...starredIds, id]);
        }
        // setClickStar(!clickStar);
    };
    console.log(starredIds);
    // starredCards.map((card) => console.log(card.id));
    const handleLoadStarredCards = () => {
        setLoadStarredCards(!loadStarredCards);
        loadCards();
    };
    return (
        <div className="container">
            <div className="row">
                {!loadStarredCards && (
                    <div className='col-md-12'>
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
                                        console.log("Current: " + id);
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
                                        <FontAwesomeIcon icon={faEye} onClick={handleLoadStarredCards} />
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
                                    console.log("Starred: " + id);
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
                                        <FontAwesomeIcon icon={faEye} onClick={handleLoadStarredCards} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="row"></div>
        </div>
    );
}
