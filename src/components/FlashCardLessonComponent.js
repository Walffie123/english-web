import {FlashcardArray} from 'react-quizlet-flashcard'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FlashCardLessonComponent(props) {
    const [cards, setCards] = useState([]);
    const { lessonid } = useParams(); 
    useEffect(() => {
        loadCards(lessonid);    
    }, []);
   const loadCards = async (lessonid) => {
            const result = await axios.get(`http://localhost:8080/loadFlashCard/${lessonid}`);
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
