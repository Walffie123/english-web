import React, { useState, useEffect } from 'react';
import { useHref, useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/btn';

import styles from './WordAss.module.scss';
const cx = classNames.bind(styles);

export default function WordAssociation() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const { lessonid } = useParams();
    const [questions, setQuestions] = useState([]);
    const clicked = [];

    useEffect(() => {
        getQuestions(lessonid);
    }, []);

    const getQuestions = async (lessonid) => {
        const res = await axios.get(`http://localhost:8080/word/${lessonid}`);
        setQuestions(res.data);
        console.log(res.data);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        handleAnswer(option.isCorrect);
        clicked.push(option);
        renderOptions.disabled = clicked.includes(option);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            alert(`Game over! Your score is ${score}`);
        }
    };

    const renderOptions = (options) => {
        return options.map((option) => (
            <Button
                className={cx('option', { selected: selectedOption === option })}
                key={option.id}
                onClick={() => handleOptionClick(option)}
            >
                {option.optionText}
            </Button>
        ));
    };

    return (
        <div className={cx('gameWA-container')}>
            <div>
                <h1>Let's Rock 🤖</h1>
                <h3 className={cx('score')}>Your score is: {score}</h3>
                <div className={cx('')}>
                    {questions.map((question, index) => {
                        if (index !== currentQuestion) {
                            return null;
                        }
                        return (
                            <article className={cx('WABox')}>
                                <div className={cx('questions-box')} id="question-display" key={question.id}>
                                    {question.questionText}
                                </div>
                                <div className={cx('options-box')}>{renderOptions(question.option)}</div>
                                <div className={cx('navi-container')}>
                                    {currentQuestion !== questions.length + 1 ? (
                                        <Button
                                            className={cx('navigation-button')}
                                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </Button>
                                    ) : null}
                                    {currentQuestion !== questions.length - 1 ? (
                                        <Button
                                            className={cx('navigation-button')}
                                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                        >
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </Button>
                                    ) : null}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
