import React, { useEffect, useState } from 'react'
import { Question, useGetRandomQuestion, useAppSelector, useAppDispatch } from "./api";
import Navbar from "./components/NavBar";
import './styles/_global.scss';
import { increment, decrement } from './state/score/scoreSlice';
import Layout from './layout';

const App: React.FC = () => {
  const [test, setTest] = useState<Question>()
  const score = useAppSelector(state => state.score.value)
  const dispatch = useAppDispatch();

  useEffect(() => setTest(useGetRandomQuestion()), [])
  return (
    <Layout>
      <Navbar />
      <div >
        <h2>Score: {score}</h2>
        {test && (
          <>
            <p>{test.question}</p>
            <ul>
              {test.answers.map(answer => <li key={answer} onClick={(() => (answer) === test.correct_answer ? dispatch(increment()) : dispatch(decrement()))}>{answer}</li>)}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}

export default App