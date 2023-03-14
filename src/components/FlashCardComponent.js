import { FlashcardArray } from 'react-quizlet-flashcard';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function FlashCardComponent(props) {
    const [cards, setCards] = useState([]);
    const [starredIds, setStarredIds] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [currentCard, setCurrentCard] = useState(1);
    const [starredCards, setStarredCards] = useState([]);
    const [loadStarredCards, setLoadStarredCards] = useState(false);
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
        
        if(loadStarredCards === true) {
            let filteredCards = newCards;
            if (shuffle) {
                filteredCards.sort(() => Math.random() - 0.5);
            } 
        if (starredIds.length > 0) {
            filteredCards = newCards.filter((card) => starredIds.includes(card.id));
        }
        setCards(filteredCards);
        } else {
            setCards(newCards);
        }
        controlRef.current.resetArray();
    };

    const handleShuffleClick = () => {
        setShuffle(!shuffle);
    };



    const handleStarClick = (id) => {
        if (starredIds.includes(id)) {
            setStarredIds(starredIds.filter((starredId) => starredId !== id));
        } else {
            setStarredIds([...starredIds, id]);
        }
    };
    console.log(starredIds);

    const renderStar = (id) => (
        <div className={`star-icon ${starredIds.includes(id) ? 'starred' : ''}`} onClick={() => handleStarClick(id)}>
            <FontAwesomeIcon icon={faStar} />
        </div>
    );

    const handleLoadStarredCards = () => {
        setLoadStarredCards(!loadStarredCards);
        loadCards();
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <FlashcardArray
                        cards={starredCards.length > 0 ? starredCards : cards}
                        frontContentStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                        backContentStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                        onCardChange={(id, index) => {
                            setCurrentCard(index);
                        }}
                        forwardRef={controlRef}
                        
                    />
                </div>
                <div className="col-12">
                    <button onClick={handleShuffleClick}>Shuffle</button>
                </div>
                <div className="col-12">
                    <span>{renderStar(currentCard)}</span>
                </div>
                <div className="col-12">
                    <button onClick={handleLoadStarredCards}>Load Starred Cards</button>
                    
                </div>
            </div>
        </div>
    );
}
