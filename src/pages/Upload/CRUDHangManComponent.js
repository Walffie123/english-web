import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CRUDHangManComponent.module.scss';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function CRUDHangManComponent(props) {
  const [hangMan, setHangMan] = useState({ question: '', word: '', level: { levelId: '' } });
  const [toUpdateHangMan, setToUpdateHangMan] = useState({ question: '', word: '', level: { levelId: '' } });
  const [hangMans, setHangMans] = useState([]);
  const [hangManId, setHangManId] = useState('');
  const [showAddHangMan, setShowAddHangMan] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const levelId = useParams();
  const baseUrl = 'http://localhost:8080'; // replace with your backend URL
  console.log(levelId);
  const saveHangMan = () => {
    console.log("Fill in blank: " + hangMan.answer);
    axios
      .post(`${baseUrl}/saveHangMan/${levelId.levelid}`, hangMan)
      .then((response) => {
        console.log(response.data);
        setHangMan({ question: '', word: '', level: { levelId: '' } });
        fetchHangMans();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (hangManId) => {
    setIsModalOpen(true);
    findHangMan(hangManId);
  };

  const fetchHangMans = async () => {
    await axios
      .get(`${baseUrl}/findAllHangManByLevel/${levelId.levelid}`)
      .then((response) => {
        console.log(response.data);
        setHangMans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findHangMan = (hangManId) => {
    setHangManId(hangManId);
    axios
      .get(`${baseUrl}/findHangMan/${hangManId}`)
      .then((response) => {
        console.log(response.data);
        setToUpdateHangMan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateHangMan = () => {
    axios
      .put(`${baseUrl}/updateHangMan/${hangManId}`, toUpdateHangMan)
      .then((response) => {
        console.log(response);
        setToUpdateHangMan({ question: '', answer: '', level: { levelId: '' } });
        setHangManId('');
        fetchHangMans();
      })
      .catch((error) => {
        console.log(error);
      });

    setIsModalOpen(false);
  };

  const deleteHangMan = (hangManId) => {
    const cofirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (cofirmDelete) {
      axios
        .delete(`${baseUrl}/deleteHangMan/${hangManId}`)
        .then((response) => {
          console.log(response);
          setHangManId('');
          fetchHangMans();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleAddHangMan = () => {
    setShowAddHangMan(!showAddHangMan);
  };

  useEffect(() => {
    fetchHangMans();
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
                <th>Word</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hangMans.map((hangMan) => (
                <AnimatePresence>
                  <motion.tr
                    key={hangMan.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                  >
                    <td>{hangMan.id}</td>
                    <td>{hangMan.question}</td>
                    <td>{hangMan.word}</td>
                    <td>{hangMan.level}</td>
                    <td>
                      <div className='row'>
                        <FontAwesomeIcon
                          id={cx('edit')}
                          className='col-md-6'
                          icon={faPenToSquare}
                          onClick={() => handleOpenModal(hangMan.id)}
                        >
                          Edit
                        </FontAwesomeIcon>
                        <FontAwesomeIcon
                          id={cx('delete')}
                          className='col-md-1'
                          icon={faTrash}
                          onClick={() => deleteHangMan(hangMan.id)}
                        >
                          Edit
                        </FontAwesomeIcon>
                      </div>
                    </td>
                  </motion.tr>
                </AnimatePresence>
              ))}
              {showAddHangMan && (
                <tr>
                  <td></td>
                  <td>
                    <input
                      className="col-md-12"
                      type="text"
                      placeholder="Front HTML"
                      value={hangMan.question}
                      onChange={(e) => setHangMan({ ...hangMan, question: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className="col-md-12"
                      type="text"
                      placeholder="Back HTML"
                      value={hangMan.answer}
                      onChange={(e) => setHangMan({ ...hangMan, answer: e.target.value })}
                    />
                  </td>
                  <td></td>
                  <td>
                    <Button variant="success" onClick={saveHangMan}>
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
            onClick={handleAddHangMan}
          >
            {showAddHangMan ? 'Quay lại' : '+ Thêm thẻ'}
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
                value={toUpdateHangMan.question}
                onChange={(e) => setToUpdateHangMan({ ...toUpdateHangMan, question: e.target.value })}
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
                value={toUpdateHangMan.answer}
                onChange={(e) => setToUpdateHangMan({ ...toUpdateHangMan, answer: e.target.value })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={updateHangMan}>
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