import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDFlashCard.css';
import { useParams } from 'react-router-dom';

export default function CRUDFlashCardComponent(props) {
    const [flashCard, setFlashCard] = useState({frontHTML: '', backHTML: ''});
    const [flashCards, setFlashCards] = useState([]);
    const [flashCardId, setFlashCardId] = useState('');
    const lessonId = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    // console.log(lessonId);
    const saveFlashCard = () => {
        axios
            .post(`${baseUrl}/saveFlashCard`, flashCard)
            .then((response) => {
                console.log(response);
                setFlashCard({frontHTML: '', backHTML: ''});
                fetchFlashCards();
            })
            .catch((error) => {
                console.log(error);
            });
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
                setFlashCard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateFlashCard = () => {
        axios
            .put(`${baseUrl}/updateFlashCard/${flashCardId}`, flashCard)
            .then((response) => {
                console.log(response);
                setFlashCard({frontHTML: '', backHTML: ''});
                setFlashCardId('');
                fetchFlashCards();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteFlashCardById = () => {
      const cofirmDelete = window.confirm('Are you sure you want to delete this flash card?');
        if(cofirmDelete){
          axios.delete(`${baseUrl}/deleteFlashCard/${flashCardId}`).then((response) => {
            console.log(response);
            setFlashCardId('');
            fetchFlashCards();
        })
        .catch((error) => {
            console.log(error);
        });
      }
    };

    useEffect(() => {
        fetchFlashCards();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>List FlashCards</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Front HTML</th>
                                <th>Back HTML</th>
                                <th>Lesson ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flashCards.map((flashCard) => (
                                <tr key={flashCard.id}>
                                    <td>{flashCard.id}</td>
                                    <td>{flashCard.frontHTML}</td>
                                    <td>{flashCard.backHTML}</td>
                                    <button onClick={() =>findFlashCardById(flashCard.id)}>Edit</button>                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>Create or Update Flash Card</h2>
                    <div>
                        <label>Front:</label>
                        <textarea
                            value={flashCard.frontHTML}
                            onChange={(e) => setFlashCard({ ...flashCard, frontHTML: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Back:</label>
                        <textarea
                            value={flashCard.backHTML}
                            onChange={(e) => setFlashCard({ ...flashCard, backHTML: e.target.value })}
                        />
                    </div>
                    <button onClick={saveFlashCard}>Save</button>
                    <button onClick={updateFlashCard}>Update</button>
                    <button onClick={deleteFlashCardById}>Delete</button>
                    {/* <div>
                        <label>Find by ID:</label>
                        <input value={flashCardId} onChange={(e) => setFlashCardId(e.target.value)} />
                        <button onClick={findFlashCardById}>Find</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
