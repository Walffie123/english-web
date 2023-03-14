import {FlashcardArray, Flashcard} from 'react-quizlet-flashcard'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlashCardComponent(props) {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        loadCards();
    }, []);
    const loadCards = async () => {
            const result = await axios.get('http://localhost:8080/loadFlashCard');
            const newCards = [];
            result.data.map((card, index) => {
               newCards.push({
                    frontHTML: "<h3>" + card.frontHTML + "</h3>",
                    backHTML:"<h3>" + card.backHTML + "</h3>",
                    id: index,
               })
            })
            setCards(newCards);
            console.log(result.data);
        
    };
      return (
        <div className="container">
            <div className="row" style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>

                <FlashcardArray cards={cards} frontContentStyle={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }
            backContentStyle={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }
            />
                </div>
            </div>
      );
}