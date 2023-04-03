import Home from './Home';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function HangManGameComponent() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/findHangManByLevel/1");
      const newWords = result.data.map(({ word, question }) => ({ word, question }));
      const newWords2 = result.data.map(({ id, word, question, level }) => ({ id, word, question, level }));
      setData(newWords2);
      setWords(newWords);
      setLoading(false); // đánh dấu việc lấy dữ liệu thành công
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      <Home words={words} />
    </div>
  );
}
