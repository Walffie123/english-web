import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FillInTheBlankGame() {
    const [sentences, setSentences] = useState([]);
    const [answers, setAnswers] = useState([]);
    const { levelid } = useParams();
    useEffect(() => {
        // Load data from JSON file
        loadFillInBlank(levelid);
    }, []);

    const loadFillInBlank = async (levelid) => {
        axios
            .get(`http://localhost:8080/loadFillInBlank/${levelid}`)
            .then((response) => {
                console.log(response.data);
                setSentences(response.data.question);
                setAnswers(response.data.answer);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleAnswerChange(index, value) {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Check answers and show score
        const score = answers.filter(
            (answer, index) => answer.toLowerCase() === sentences[index].answer.toLowerCase(),
        ).length;
        alert(`You got ${score} out of ${sentences.length} correct!`);
    }

    return (
        <form onSubmit={handleSubmit}>
           <div>
                {sentences.map((sentence, index) => (
                    <div key={index}>
                        {sentence}
                        <input
                            type="text"
                            value={answers[index]}
                            onChange={(event) => handleAnswerChange(index, event.target.value)}
                        />
                        </div>
                ))}        
           </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FillInTheBlankGame;
