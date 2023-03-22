import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FillInBlank = () => {
  const [fillInBlanks, setFillInBlanks] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedFillInBlank, setSelectedFillInBlank] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/loadFillInBlank')
      .then(response => {
        setFillInBlanks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAddFillInBlank = () => {
    axios.post('http://localhost:8080/saveFillInBlank', { question: question, answer: answer })
      .then(() => {
        setQuestion('');
        setAnswer('');
        axios.get('http://localhost:8080/loadFillInBlank')
          .then(response => {
            setFillInBlanks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEditFillInBlank = () => {
    axios.put(`http://localhost:8080/updateFillInBlank/${selectedFillInBlank.id}`, { question: question, answer: answer })
      .then(() => {
        setQuestion('');
        setAnswer('');
        setSelectedFillInBlank(null);
        setModalOpen(false);
        axios.get('http://localhost:8080/loadFillInBlank')
          .then(response => {
            setFillInBlanks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteFillInBlank = (fillInBlankId) => {
    axios.delete(`http://localhost:8080/deleteFillInBlank/${fillInBlankId}`)
      .then(() => {
        axios.get('http://localhost:8080/loadFillInBlank')
          .then(response => {
            setFillInBlanks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleEditButtonClick = (fillInBlank) => {
    setSelectedFillInBlank(fillInBlank);
    setQuestion(fillInBlank.question);
    setAnswer(fillInBlank.answer);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFillInBlank(null);
    setQuestion('');
    setAnswer('');
    setModalOpen(false);
  };

  return (
    <>
    <div>
      <h1>Fill In Blank Game</h1>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fillInBlanks.map(fillInBlank => (
            <tr key={fillInBlank.id}>
              <td>{fillInBlank.question}</td>
              <td>{fillInBlank.answer}</td>
              <td>
                <button onClick={() => handleEditButtonClick(fillInBlank)}>Edit</button>
                <button onClick={() => handleDeleteFillInBlank(fillInBlank.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setModalOpen(true)}>Add Fill In Blank</button>
    </div>
    {modalOpen && (
      <div>
        <h2>{selectedFillInBlank ? 'Edit' : 'Add'} Fill In Blank</h2>
        <div>
          <label>Question</label>
          <input type="text" value={question} onChange={handleQuestionChange} />
        </div>
        <div>
          <label>Answer</label>
          <input type="text" value={answer} onChange={handleAnswerChange} />
        </div>
        <div>
          <button onClick={selectedFillInBlank ? handleEditFillInBlank : handleAddFillInBlank}>
            {selectedFillInBlank ? 'Save' : 'Add'}
          </button>
          <button onClick={handleModalClose}>Cancel</button>
        </div>
      </div>
    )}
    </>
  );
};
export default FillInBlank;
