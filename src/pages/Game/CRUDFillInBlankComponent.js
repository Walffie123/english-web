// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FillInBlank = () => {
//   const [fillInBlanks, setFillInBlanks] = useState([]);
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [selectedFillInBlank, setSelectedFillInBlank] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:8080/loadFillInBlank')
//       .then(response => {
//         setFillInBlanks(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const handleQuestionChange = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleAnswerChange = (event) => {
//     setAnswer(event.target.value);
//   };

//   const handleAddFillInBlank = () => {
//     axios.post('http://localhost:8080/saveFillInBlank', { question: question, answer: answer })
//       .then(() => {
//         setQuestion('');
//         setAnswer('');
//         axios.get('http://localhost:8080/loadFillInBlank')
//           .then(response => {
//             setFillInBlanks(response.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const handleEditFillInBlank = () => {
//     axios.put(`http://localhost:8080/updateFillInBlank/${selectedFillInBlank.id}`, { question: question, answer: answer })
//       .then(() => {
//         setQuestion('');
//         setAnswer('');
//         setSelectedFillInBlank(null);
//         setModalOpen(false);
//         axios.get('http://localhost:8080/loadFillInBlank')
//           .then(response => {
//             setFillInBlanks(response.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const handleDeleteFillInBlank = (fillInBlankId) => {
//     axios.delete(`http://localhost:8080/deleteFillInBlank/${fillInBlankId}`)
//       .then(() => {
//         axios.get('http://localhost:8080/loadFillInBlank')
//           .then(response => {
//             setFillInBlanks(response.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const handleEditButtonClick = (fillInBlank) => {
//     setSelectedFillInBlank(fillInBlank);
//     setQuestion(fillInBlank.question);
//     setAnswer(fillInBlank.answer);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setSelectedFillInBlank(null);
//     setQuestion('');
//     setAnswer('');
//     setModalOpen(false);
//   };

//   return (
//     <>
//     <div>
//       <h1>Fill In Blank Game</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Question</th>
//             <th>Answer</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fillInBlanks.map(fillInBlank => (
//             <tr key={fillInBlank.id}>
//               <td>{fillInBlank.question}</td>
//               <td>{fillInBlank.answer}</td>
//               <td>
//                 <button onClick={() => handleEditButtonClick(fillInBlank)}>Edit</button>
//                 <button onClick={() => handleDeleteFillInBlank(fillInBlank.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={() => setModalOpen(true)}>Add Fill In Blank</button>
//     </div>
//     {modalOpen && (
//       <div>
//         <h2>{selectedFillInBlank ? 'Edit' : 'Add'} Fill In Blank</h2>
//         <div>
//           <label>Question</label>
//           <input type="text" value={question} onChange={handleQuestionChange} />
//         </div>
//         <div>
//           <label>Answer</label>
//           <input type="text" value={answer} onChange={handleAnswerChange} />
//         </div>
//         <div>
//           <button onClick={selectedFillInBlank ? handleEditFillInBlank : handleAddFillInBlank}>
//             {selectedFillInBlank ? 'Save' : 'Add'}
//           </button>
//           <button onClick={handleModalClose}>Cancel</button>
//         </div>
//       </div>
//     )}
//     </>
//   );
// };
// export default FillInBlank;

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
    const [toUpdateFillInBlank, setToUpdateFillInBlank] = useState({ question: '', answer: '', level: { levelId: '' } });
    const [fillinblanks, setFillInBlanks] = useState([]);
    const [fillinBlankId, setFillInBlankId] = useState('');
    const [showAddFillInBlank, setShowAddFillInBlank] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const levelId = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    console.log(levelId);
    const saveFillInBlank = () => {
        console.log( "Fill in blank: " +fillinblank.answer);
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
                setFillInBlankId ('');
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
        <div className={cx('container')}>
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
                                        <div className='row'>
                                        <FontAwesomeIcon
                                            id={cx('edit')}
                                            className='col-md-6'                                        
                                            icon={faPenToSquare}
                                            onClick={() => handleOpenModal(fillInBlank.id)}
                                        >
                                            Edit
                                        </FontAwesomeIcon>
                                        <FontAwesomeIcon
                                            id={cx('delete')}
                                            className='col-md-1'    
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
                                            placeholder="Front HTML"
                                            value={fillinblank.question}
                                            onChange={(e) => setFillInBlank({ ...fillinblank, question: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="col-md-12"
                                            type="text"
                                            placeholder="Back HTML"
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
                            <label className="col-md-4" htmlFor="frontHTML">
                                Question
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="frontHTML"
                                value={toUpdateFillInBlank.question}
                                onChange={(e) => setToUpdateFillInBlank({ ...toUpdateFillInBlank, question: e.target.value })}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-4" htmlFor="backHTML">
                                Answer
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={toUpdateFillInBlank.answer}
                                onChange={(e) => setToUpdateFillInBlank({ ...toUpdateFillInBlank, answer: e.target.value })}
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
