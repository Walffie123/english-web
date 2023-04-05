import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowRight, faArrowRotateBackward, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './fillinblank.css';
import Button from '~/components/Button/btn';
import AudioPlayer from '../WordAssociation/Audio';

function FillInTheBlankGame() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false);
    const { levelid } = useParams();
    const [displayWarning, setDisplayWarning] = useState(false);

    useEffect(() => {
        loadQuestions(levelid);
    }, [levelid]);

    const loadQuestions = async (levelid) => {
        try {
            const response = await axios.get(`http://localhost:8080/loadFillInBlank/${levelid}`);
            console.log(response.data);
            setQuestions(response.data);
            setAnswers(Array(response.data.length).fill(''));
            setCurrentQuestionIndex(0);
            setScore(null);
            setShowAnswers(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAnswerChange = (event) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        const currentAnswer = answers[currentQuestionIndex];
        if (!currentAnswer) {
            setDisplayWarning(true);
            setTimeout(() => {
                setDisplayWarning(false);
            }, 5000);
            return;
        }
        setDisplayWarning(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const newScore = answers.filter(
                (answer, index) => answer.toLowerCase() === questions[index].answer.toLowerCase(),
            ).length;
            setScore(newScore);
            setShowAnswers(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handlePlayAgain = () => {
        loadQuestions(levelid);
    };

    if (!questions.length) {
        return <div>Loading...</div>;
    }

    if (score !== null) {
        return (
            <>
                <div className="result">
                    <div className="qtitle">Fill in the Blank Game</div>
                    <div className="qtitle2">
                        Score: {score} out of {questions.length}
                    </div>
                    <div className="container">
                        {questions.map((question, index) => (
                            <div key={index}>
                                <div>
                                    {question.question}{' '}
                                    {answers[index].toLowerCase() === question.answer.toLowerCase() && (
                                        <FontAwesomeIcon icon={faCheck} />
                                    )}
                                    {answers[index].toLowerCase() !== question.answer.toLowerCase() && (
                                        <FontAwesomeIcon icon={faTimes} />
                                    )}
                                    {answers[index].toLowerCase() !== question.answer.toLowerCase() && (
                                        <div className="yanswer">Your answer: {answers[index]}</div>
                                    )}
                                    <div className="canswer">Correct answer: {question.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button back href={'/fillinblank'}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to games
                    </Button>

                    <Button back onClick={handlePlayAgain}>
                        <FontAwesomeIcon icon={faArrowRotateBackward} /> Play Again
                    </Button>
                </div>
            </>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <div className="fillquestion-container">
            <AudioPlayer src={require('../../../assets/images/kahoot12.mp3')} />
                <div className="qtitle">Fill In Blank Game</div>
                <div className="qcontainer">
                    <div className="qnumber">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className="questions">
                        <p>{currentQuestion.question}</p>
                        <input
                            className="input"
                            type="text"
                            value={answers[currentQuestionIndex]}
                            onChange={handleAnswerChange}
                            placeholder="Enter your answer"
                        />
                    </div>
                    <div className="btn">
                        {currentQuestionIndex > 0 && (
                            <button className="fillin-button" onClick={() => handlePreviousQuestion()}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Previous
                            </button>
                        )}
                        {currentQuestionIndex < questions.length - 1 && (
                            <button className="fillin-button" onClick={() => handleNextQuestion()}>
                                Next <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        )}
                    </div>

                    {currentQuestionIndex === questions.length - 1 && (
                        <button className="fillin-button" onClick={() => handleNextQuestion()}>
                            Finish <FontAwesomeIcon icon={faCheck} />
                        </button>
                    )}

                    {displayWarning && (
                        <div style={{ color: 'red' }}>Please enter an answer before moving to the next question.</div>
                    )}
                </div>
                <Button back href={'/fillinblank'}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </Button>
            </div>
        </>
    );
}

export default FillInTheBlankGame;
