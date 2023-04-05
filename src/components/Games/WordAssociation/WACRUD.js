import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './WACRUD.module.scss';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function WACRUD(props) {
    const [question, setquestion] = useState({ questionText: '', lesson: { lessonId: '' } });
    const [toUpdatequestion, setToUpdatequestion] = useState({ questionText: '', lesson: { lessonId: '' } });
    const [questions, setquestions] = useState([]);
    const [questionId, setquestionId] = useState('');
    const [showAddquestion, setShowAddquestion] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const lessonId = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    // console.log(lessonId);
    const savequestion = () => {
        if (question.questionText === '') {
            window.alert('Please fill in all fields');
            return;
        } else {
            axios
                .post(`${baseUrl}/saveQuestions/${lessonId.lessonid}`, question)
                .then((response) => {
                    console.log(response);
                    setquestion({ questionText: '', lesson: { lessonId: '' } });
                    fetchquestions();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setquestion({ questionText: '', lesson: { lessonId: '' } });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (questionId) => {
        setIsModalOpen(true);
        findquestionById(questionId);
    };

    const fetchquestions = async () => {
        await axios
            .get(`${baseUrl}/word/${lessonId.lessonid}`)
            .then((response) => {
                console.log(response.data);
                setquestions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const findquestionById = (questionId) => {
        setquestionId(questionId);
        axios
            .get(`${baseUrl}/findQuestionsById/${questionId}`)
            .then((response) => {
                console.log(response.data);
                setToUpdatequestion(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updatequestion = () => {
        if (toUpdatequestion.questionText === '') {
            window.alert('Fields cannot be empty');
            return;
        } else {
            axios
                .put(`${baseUrl}/updateQuestions/${questionId}`, toUpdatequestion)
                .then((response) => {
                    console.log(response);
                    setToUpdatequestion({ questionText: '', lesson: { lessonId: '' } });
                    setquestionId('');
                    fetchquestions();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setIsModalOpen(false);
        setquestion({ questionText: '', lesson: { lessonId: '' } });
    };

    const deletequestionById = (questionId) => {
        // const cofirmDelete = window.confirm('Are you sure you want to delete this flash card?');
        // if (cofirmDelete) {
        axios
            .delete(`${baseUrl}/deleteQuestionsById/${questionId}`)
            .then((response) => {
                console.log(response);
                setquestionId('');
                fetchquestions();
            })
            .catch((error) => {
                console.log(error);
            });
        // }
    };
    const handleAddquestion = () => {
        setShowAddquestion(!showAddquestion);
    };

    useEffect(() => {
        fetchquestions();
    }, []);

    return (
        <div className={cx('WACRUD-container')}>
            <div className={cx('row')}>
                <div className="col-md-12">
                    <h1>List questions</h1>
                    <table className={cx('listquestion')}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>questionText</th>
                                <th>Lesson ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <AnimatePresence>
                                    <motion.tr
                                        key={question.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td>{question.question_id}</td>
                                        <td>{question.questionText}</td>
                                        <td>{question.backHTML}</td>
                                        <td>{question.lessonid}</td>
                                        <td>
                                            <div className="row">
                                                <FontAwesomeIcon
                                                    id={cx('edit')}
                                                    className="col-md-6"
                                                    icon={faPenToSquare}
                                                    onClick={() => handleOpenModal(question.question_id)}
                                                >
                                                    Edit
                                                </FontAwesomeIcon>
                                                <FontAwesomeIcon
                                                    id={cx('delete')}
                                                    className="col-md-1"
                                                    icon={faTrash}
                                                    onClick={() => deletequestionById(question.question_id)}
                                                >
                                                    Edit
                                                </FontAwesomeIcon>
                                            </div>
                                        </td>
                                    </motion.tr>
                                </AnimatePresence>
                            ))}
                            {showAddquestion && (
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="questionText"
                                            value={question.questionText}
                                            onChange={(e) => {
                                                setquestion({ ...question, questionText: e.target.value });
                                            }}
                                        />
                                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    </td>

                                    <td>
                                        <Button variant="success" onClick={savequestion}>
                                            Save
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-12">
                    <button
                        className={cx('col-md-12')}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.5rem',
                            marginRight: '0.5rem',
                        }}
                        onClick={handleAddquestion}
                    >
                        {showAddquestion ? 'Quay lại' : '+ Thêm thẻ'}
                    </button>
                </div>
                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Flash Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="questionText">
                                questionText
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="questionText"
                                value={toUpdatequestion.questionText}
                                onChange={(e) =>
                                    setToUpdatequestion({ ...toUpdatequestion, questionText: e.target.value })
                                }
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updatequestion}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
