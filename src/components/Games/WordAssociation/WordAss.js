// import './style.css';
// import React from 'react';

// function WordAsscociation() {
//     const scoreDisplay = document.getElementById('score-display');
//     const questionDisplay = document.getElementById('question-display');

//     const questions = [
//         {
//             quiz: ['big', 'giant', 'gigantic'],
//             options: ['small', 'huge'],
//             correct: 2,
//         },
//         {
//             quiz: ['close', 'near', 'next'],
//             options: ['trace', 'adjacent'],
//             correct: 2,
//         },
//         {
//             quiz: ['bird', 'fly', 'cucumber'],
//             options: ['duck', 'dick'],
//             correct: 2,
//         },
//     ];

//     let score = 0;
//     let clicked = [];
//     scoreDisplay.textContent = score;

//     function populateQuestions() {
//         //Create a box that append questions and options
//         questions.forEach((question) => {
//             const questionBox = document.createElement('div');
//             questionBox.classList.add('question-box');

//             //Create a logo in box
//             const logoDisplay = document.createElement('img');
//             logoDisplay.src = './icons8-bear-64.png';
//             logoDisplay.alt = 'Logo';
//             logoDisplay.id = 'logo';
//             questionBox.append(logoDisplay);

//             //get question from array and post it in box
//             question.quiz.forEach((tip) => {
//                 const tipText = document.createElement('p');
//                 tipText.textContent = tip;
//                 questionBox.append(tipText);
//             });

//             //create a button for each option
//             const optionsButtons = document.createElement('div');
//             optionsButtons.classList.add('options-buttons');

//             question.options.forEach((option, optionIndex) => {
//                 const optionButton = document.createElement('button');
//                 optionButton.classList.add('option-button');
//                 optionButton.textContent = option;
//                 //check if the option is correct (cach 1)
//                 optionButton.addEventListener('click', () =>
//                     checkAnswer(optionButton, questionBox, option, optionIndex + 1, question.correct),
//                 );

//                 optionsButtons.append(optionButton);
//                 questionBox.append(optionsButtons);
//                 //Cach 2
//                 //     optionButton.addEventListener('click',() => {
//                 //         if(optionButton.textContent === question.options[question.correct - 1]) {
//                 //             score++
//                 //             scoreDisplay.textContent = score

//                 //         } else {
//                 //            score--
//                 //         scoreDisplay.textContent = score
//                 //         }
//                 //     })
//             });
//             //hien thi ket qua
//             const answerDisplay = document.createElement('div');
//             answerDisplay.classList.add('answer-display');
//             questionBox.append(answerDisplay);

//             questionDisplay.append(questionBox);
//         });
//     }

//     populateQuestions();

//     function checkAnswer(optionButton, questionBox, option, optionIndex, correctAnswer) {
//         console.log('option!', option);
//         console.log('optionIndex!', optionIndex);
//         if (optionIndex === correctAnswer) {
//             score++;
//             scoreDisplay.textContent = score;
//             addResult(questionBox, 'Correct :)!');
//         } else {
//             score--;
//             scoreDisplay.textContent = score;
//             addResult(questionBox, 'Wrong :( !');
//         }
//         //disable button after click
//         clicked.push(option);
//         optionButton.disabled = clicked.includes(option);
//     }

//     function addResult(questionBox, result) {
//         const answerDisplay = questionBox.querySelector('.answer-display');
//         answerDisplay.textContent = '';
//         answerDisplay.textContent = result;

//         // const resultBox = document.createElement('div')
//         // resultBox.classList.add('result-box')
//         // const resultText = document.createElement('p')
//         // resultText.textContent = question.option
//         // resultBox.append(resultText)
//         // questionBox.append(resultBox)
//     }
//     return (
//         <div class="game-container">
//             <div class="question-area">
//                 <h1>Welcome to Word Asscociation</h1>
//                 <h3>
//                     Your score is: <span id="score-display"></span>
//                 </h3>
//                 <div class="questions" id="question-display"></div>
//             </div>
//         </div>
//     );
// }

// export default WordAsscociation;

import React, { useState } from 'react';
import './style.css';
import Logo from '../../..//components//Games//WordAssociation//icons8-bear-64.png';

function WordAssociation() {
    const [score, setScore] = useState(0);
    const questions = [
        {
            quiz: ['big', 'giant', 'gigantic'],
            options: ['small', 'huge'],
            correct: 2,
        },
        {
            quiz: ['close', 'near', 'next'],
            options: ['trace', 'adjacent'],
            correct: 2,
        },
        {
            quiz: ['bird', 'fly', 'cucumber'],
            options: ['duck', 'dick'],
            correct: 2,
        },
    ];

    function checkAnswer(optionIndex, correctAnswer) {
        if (optionIndex === correctAnswer) {
            setScore((prevScore) => prevScore + 1);
            return 'Correct 🙂!';
        } else {
            setScore((prevScore) => prevScore - 1);
            return 'Wrong 🙁 !';
        }
    }

    return (
        <div className="game-container">
            <div className="question-area">
                <h1>Welcome to Word Association</h1>
                <h3>
                    Your score is: <span id="score-display">{score}</span>
                </h3>
                <div className="questions" id="question-display">
                    {questions.map((question, index) => (
                        <div className="question-box" key={index}>
                            <img src={Logo} alt="Logo" id="logo" />
                            {question.quiz.map((tip, tipIndex) => (
                                <p key={tipIndex}>{tip}</p>
                            ))}
                            <div className="options-buttons">
                                {question.options.map((option, optionIndex) => (
                                    <button
                                        className="option-button"
                                        key={optionIndex}
                                        onClick={() => checkAnswer(optionIndex + 1, question.correct)}
                                        disabled={score < 0}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div className="answer-display"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WordAssociation;
