// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function FillInTheBlankGame() {
//     const [sentences, setSentences] = useState([]);
//     const [answers, setAnswers] = useState([]);
//     const { levelid } = useParams();

//     useEffect(() => {
//         // Load data from JSON file
//         loadFillInBlank(levelid);
//     }, [levelid]);

//     const loadFillInBlank = async (levelid) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/loadFillInBlank/${levelid}`);
//             // console.log(response.data.map((item) => item.question));
//             setSentences(response.data.map((item) => item.question));
//             setAnswers(response.data.answer.map((item) => item.answer));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     function handleAnswerChange(index, value) {
//         const newAnswers = [...answers];
//         newAnswers[index] = value;
//         setAnswers(newAnswers);
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         // Check answers and show score
//         const score = answers.filter(
//             (answer, index) => answer.toLowerCase() === sentences[index].answer.toLowerCase(),
//         ).length;
//         alert(`You got ${score} out of ${sentences.length} correct!`);
//     }

//     if (!sentences) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//            <div>
//                 {sentences.map((sentence, index) => (
//                     <div key={index}>
//                         {sentence}
//                         <input
//                             type="text"
//                             value={answers[index]}
//                             onChange={(event) => handleAnswerChange(index, event.target.value)}
//                         />
//                         </div>
//                 ))}        
//            </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

// export default FillInTheBlankGame;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FillInTheBlankGame() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const { levelid } = useParams();

  useEffect(() => {
    loadQuestions(levelid);
  }, [levelid]);

  const loadQuestions = async (levelid) => {
    try {
      const response = await axios.get(`http://localhost:8080/loadFillInBlank/${levelid}`);
      setQuestions(response.data);
      setAnswers(Array(response.data.length).fill(''));
      setScore(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newScore = answers.filter(
      (answer, index) => answer.toLowerCase() === questions[index].answer.toLowerCase()
    ).length;
    setScore(newScore);
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Fill in the Blank Game</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <input
              type="text"
              value={answers[index]}
              onChange={(event) => handleAnswerChange(index, event.target.value)}
            />
          </div>
        ))}
        <button type="submit">Check Answers</button>
      </form>
      {score !== null && (
        <div>
          <h2>Score: {score} out of {questions.length}</h2>
          <button onClick={() => loadQuestions(levelid)}>Play Again</button>
        </div>
      )}
    </>
  );
}

export default FillInTheBlankGame;


