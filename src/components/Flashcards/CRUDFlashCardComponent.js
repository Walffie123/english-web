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
export default function CRUDFlashCardComponent(props) {
    const [flashCard, setFlashCard] = useState({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
    const [toUpdateFlashCard, setToUpdateFlashCard] = useState({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
    const [flashCards, setFlashCards] = useState([]);
    const [flashCardId, setFlashCardId] = useState('');
    const [showAddFlashCard, setShowAddFlashCard] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const lessonId = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    // console.log(lessonId);
    const saveFlashCard = () => {
        if(flashCard.frontHTML === '' || flashCard.backHTML === '') {
            window.alert('Please fill in all fields');
            return;
        } else{
            axios
            .post(`${baseUrl}/saveFlashCard/${lessonId.lessonid}`, flashCard)
            .then((response) => {
                console.log(response);
                setFlashCard({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
                fetchFlashCards();
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setFlashCard({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (flashCardId) => {
        setIsModalOpen(true);
        findFlashCardById(flashCardId);
    };

    const fetchFlashCards = async () => {
        await axios
            .get(`${baseUrl}/findFlashCardByLessonId/${lessonId.lessonid}`)
            .then((response) => {
                console.log(response.data);
                setFlashCards(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const findFlashCardById = (flashCardId) => {
        setFlashCardId(flashCardId);
        axios
            .get(`${baseUrl}/findFlashCard/${flashCardId}`)
            .then((response) => {
                console.log(response.data);
                setToUpdateFlashCard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateFlashCard = () => {

        if(toUpdateFlashCard.frontHTML === '' || toUpdateFlashCard.backHTML === '') {
            window.alert('Fields cannot be empty');
            return;
        }
        else{
            console.log(toUpdateFlashCard);
        axios
            .put(`${baseUrl}/updateFlashCard/${flashCardId}/${lessonId.lessonid}`, toUpdateFlashCard)
            .then((response) => {
                console.log(response);
                setToUpdateFlashCard({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
                setFlashCardId('');
                fetchFlashCards();
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setIsModalOpen(false);
        setFlashCard({ frontHTML: '', backHTML: '', lesson: { lessonId: '' } });
    };

    const deleteFlashCardById = (flashCardId) => {
        // const cofirmDelete = window.confirm('Are you sure you want to delete this flash card?');
        // if (cofirmDelete) {
            axios
                .delete(`${baseUrl}/deleteFlashCard/${flashCardId}`)
                .then((response) => {
                    console.log(response);
                    setFlashCardId('');
                    fetchFlashCards();
                })
                .catch((error) => {
                    console.log(error);
                });
        // }
    };
    const handleAddFlashCard = () => {
        setShowAddFlashCard(!showAddFlashCard);
    };

    useEffect(() => {
        fetchFlashCards();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className="col-md-12">
                    <h1>List FlashCards</h1>
                    <table className={cx('listFlashCard')}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Front HTML</th>
                                <th>Back HTML</th>
                                <th>Lesson ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flashCards.map((flashCard) => (
                                <AnimatePresence>
                                    <motion.tr
                                        key={flashCard.id}
                                        layout
                                        initial={{ opacity: 0}}
                                        animate={{ opacity: 1}}
                                        exit={{ opacity: 0}}
                                    >
                                        <td>{flashCard.id}</td>
                                        <td>{flashCard.frontHTML}</td>
                                        <td>{flashCard.backHTML}</td>
                                        <td>{flashCard.lessonId}</td>
                                        <td>
                                        <div className='row'>
                                        <FontAwesomeIcon
                                            id={cx('edit')}
                                            className='col-md-6'                                        
                                            icon={faPenToSquare}
                                            onClick={() => handleOpenModal(flashCard.id)}
                                        >
                                            Edit
                                        </FontAwesomeIcon>
                                        <FontAwesomeIcon
                                            id={cx('delete')}
                                            className='col-md-1'    
                                            icon={faTrash}
                                            onClick={() => deleteFlashCardById(flashCard.id)}
                                        >
                                            Edit
                                        </FontAwesomeIcon>
                                        </div>
                                        </td>
                                    </motion.tr>
                                </AnimatePresence>
                            ))}
                            {showAddFlashCard && (
                                <tr>
                                    <td></td>
                                    <td>
                                        
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="Front HTML"
                                            value={flashCard.frontHTML}
                                            onChange={(e) => {setFlashCard({ ...flashCard, frontHTML: e.target.value })
                                        }}
                                        />
                                          {errorMessage && <p style={{ color: 'red' }} >{errorMessage}</p>}                                                                            
                                    </td>
                                    <td>
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="Back HTML"
                                            value={flashCard.backHTML}
                                            onChange={(e) => {setFlashCard({ ...flashCard, backHTML: e.target.value })}}
                                        />
                                    </td> 
                                    <td>
                                        <Button variant="success" onClick={saveFlashCard}>
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
                        onClick={handleAddFlashCard}
                    >
                        {showAddFlashCard ? 'Quay lại' : '+ Thêm thẻ'}
                    </button>
                </div>
                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Flash Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="frontHTML">
                                Front HTML
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="frontHTML"
                                value={toUpdateFlashCard.frontHTML}
                                onChange={(e) => setToUpdateFlashCard({ ...toUpdateFlashCard, frontHTML: e.target.value })}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-4" htmlFor="backHTML">
                                Back HTML
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={toUpdateFlashCard.backHTML}
                                onChange={(e) => setToUpdateFlashCard({ ...toUpdateFlashCard, backHTML: e.target.value })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updateFlashCard}>
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
