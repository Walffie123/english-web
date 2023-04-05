import React, { useState, useEffect } from 'react';
import { useHref, useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes, faArrowLeft, faArrowRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/btn';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './WordAss.module.scss';
import { Howl, Howler } from 'howler'; // Import Howl here
import moment from 'moment';
import AudioPlayer from './Audio';
const cx = classNames.bind(styles);
const token = localStorage.getItem('user');
const user = JSON.parse(token);
// console.log(user.roles);
const isUserLoggedIn = user !== null;

export default function WordAssociation() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const resultTime = moment();
    const { lessonid } = useParams();
    const [questions, setQuestions] = useState([]);
    const clicked = [];
    const baseUrl = 'http://localhost:8080'
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
        setSelectedOption([...selectedOption, option]);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 10);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            const sendData = {
                resultTime: resultTime.toJSON(),
                score: score
            };
            axios.post(`${baseUrl}/saveResult/${lessonid}/1`, sendData).then(response => {
                // Xử lý kết quả trả về từ backend (nếu có)
                console.log(response.data);
            }).catch(error => {
                // Xử lý lỗi khi gửi request đến backend
                console.error(error);
            });
            alert(`Game over! Your score is ${score}`);
        }
    };

    const renderOptions = (options) => {
        return options.map((option) => (
            <Button
                className={cx('option', { selected: selectedOption === option })}
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption.includes(option)}
            >
                {option.optionText}
            </Button>
        ));
    };

    return (
        <div className={cx('gameWA-container')}>
            <div className={cx('WA-row')}>
                <div className={cx('WA-scoreboard', 'col-md-3', 'order-md-2')}>
                    <div className={cx('WA-button-navi')}>
                        <AudioPlayer src={require('../../../assets/images/kahoot2.mp3')} />
                        <a href="/wordassintro" style={{ marginLeft: '20px' }}>
                            <FontAwesomeIcon icon={faX} />
                        </a>
                    </div>
                    <h3 className={cx('score')}>Score is: {score}</h3>
                    <div className={cx('username')}>Welcome, {user.username}</div>
                </div>
                <div className={cx('WABox', 'col-md-9')}>
                    {questions.map((question, index) => {
                        if (index !== currentQuestion) {
                            return null;
                        }
                        return (
                            <article>
                                <div className={cx('questions-box')} id="question-display" key={question.id}>
                                    {question.questionText}
                                </div>
                                <div className={cx('options-box')}>{renderOptions(question.option)}</div>
                                <div className={cx('navi-container')}>
                                    {currentQuestion !== 0 ? (
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
