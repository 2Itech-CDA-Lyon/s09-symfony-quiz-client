import React, { useEffect, useState } from 'react';

const App = () => {
  const [quizzes, setQuizzes] = useState<any>([]);

  useEffect(
    () => {
      fetch('http://localhost:8000/api/quiz')
      .then(response => response.json())
      .then(json => setQuizzes(json));
    }, []
  )

  return (
    <>
      <h2>Jouer</h2>
      <ul>
        {
          quizzes.map(
            (quiz: any) => <li>{quiz.title}</li>
          )
        }
      </ul>
    </>
  );
}

export default App;
