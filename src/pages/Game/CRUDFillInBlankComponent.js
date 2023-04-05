import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CRUDFlashCardComponent.module.scss';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function CRUDFillInBlankComponent(props) {
    const [fillinblank, setFillInBlank] = useState({ question: '', answer: '', level: { levelId: '' } });
    const [toUpdateFillInBlank, setToUpdateFillInBlank] = useState({
        question: '',
        answer: '',
        level: { levelId: '' },
    });
    const [fillinblanks, setFillInBlanks] = useState([]);
    const [fillinBlankId, setFillInBlankId] = useState('');
    const [showAddFillInBlank, setShowAddFillInBlank] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const levelId = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    console.log(levelId);

    function isInputValid(input) {
        return input !== null && input.trim() !== '';
    }

    const saveFillInBlank = () => {
        if (!isInputValid(fillinblank.answer) && !isInputValid(fillinblank.question)) {
            alert('Please enter a valid answer or question');
            return;
        }
        axios
            .post(`${baseUrl}/saveFillInBlank/${levelId.levelid}`, fillinblank)
            .then((response) => {
                console.log(response.data);
                setFillInBlank({ question: '', answer: '', level: { levelId: '' } });
                fetchFillInBlanks();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (fillinBlankId) => {
        setIsModalOpen(true);
        findFillInBlank(fillinBlankId);
    };

    const fetchFillInBlanks = async () => {
        await axios
            .get(`${baseUrl}/findAllFillInBlankByLevelId/${levelId.levelid}`)
            .then((response) => {
                console.log(response.data);
                setFillInBlanks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const findFillInBlank = (fillinBlankId) => {
        setFillInBlankId(fillinBlankId);
        axios
            .get(`${baseUrl}/findFillInBlank/${fillinBlankId}`)
            .then((response) => {
                console.log(response.data);
                setToUpdateFillInBlank(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateFillInBlank = () => {
        axios
            .put(`${baseUrl}/updateFillInBlank/${fillinBlankId}`, toUpdateFillInBlank)
            .then((response) => {
                console.log(response);
                setToUpdateFillInBlank({ question: '', answer: '', level: { levelId: '' } });
                setFillInBlankId('');
                fetchFillInBlanks();
            })
            .catch((error) => {
                console.log(error);
            });

        setIsModalOpen(false);
    };

    const deleteFillInBlank = (fillinBlankId) => {
        const cofirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (cofirmDelete) {
            axios
                .delete(`${baseUrl}/deleteFillInBlank/${fillinBlankId}`)
                .then((response) => {
                    console.log(response);
                    setFillInBlankId('');
                    fetchFillInBlanks();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleAddFillInBlank = () => {
        setShowAddFillInBlank(!showAddFillInBlank);
    };

    useEffect(() => {
        fetchFillInBlanks();
    }, []);

    return (
        <div className={cx('Fillincrud-container')}>
            <div className={cx('row')}>
                <div className="col-md-12">
                    <h1>List Fill In Blank questions</h1>
                    <table className={cx('listFlashCard')}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Level ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fillinblanks.map((fillInBlank) => (
                                <AnimatePresence>
                                    <motion.tr
                                        key={fillInBlank.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                    >
                                        <td>{fillInBlank.id}</td>
                                        <td>{fillInBlank.question}</td>
                                        <td>{fillInBlank.answer}</td>
                                        <td>{fillInBlank.level}</td>
                                        <td>
                                            <div className="row">
                                                <FontAwesomeIcon
                                                    id={cx('edit')}
                                                    className="col-md-6"
                                                    icon={faPenToSquare}
                                                    onClick={() => handleOpenModal(fillInBlank.id)}
                                                >
                                                    Edit
                                                </FontAwesomeIcon>
                                                <FontAwesomeIcon
                                                    id={cx('delete')}
                                                    className="col-md-1"
                                                    icon={faTrash}
                                                    onClick={() => deleteFillInBlank(fillInBlank.id)}
                                                >
                                                    Edit
                                                </FontAwesomeIcon>
                                            </div>
                                        </td>
                                    </motion.tr>
                                </AnimatePresence>
                            ))}
                            {showAddFillInBlank && (
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="Question"
                                            value={fillinblank.question}
                                            onChange={(e) =>
                                                setFillInBlank({ ...fillinblank, question: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="Answer"
                                            value={fillinblank.answer}
                                            onChange={(e) => setFillInBlank({ ...fillinblank, answer: e.target.value })}
                                        />
                                    </td>
                                    <td></td>
                                    <td>
                                        <Button variant="success" onClick={saveFillInBlank}>
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
                        onClick={handleAddFillInBlank}
                    >
                        {showAddFillInBlank ? 'Quay lại' : '+ Thêm thẻ'}
                    </button>
                </div>
                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Question Answer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="question">
                                Question
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="question"
                                value={toUpdateFillInBlank.question}
                                onChange={(e) =>
                                    setToUpdateFillInBlank({ ...toUpdateFillInBlank, question: e.target.value })
                                }
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-4" htmlFor="answer">
                                Answer
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="answer"
                                value={toUpdateFillInBlank.answer}
                                onChange={(e) =>
                                    setToUpdateFillInBlank({ ...toUpdateFillInBlank, answer: e.target.value })
                                }
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updateFillInBlank}>
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
