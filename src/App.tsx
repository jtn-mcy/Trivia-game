import React, { useEffect, useState, } from 'react'
import { Question, useGetRandomQuestion, useAppSelector, useAppDispatch } from "./api";
import './styles/_global.scss';
import { increment, decrement } from './state/score/scoreSlice';
import UserNameContextWrapper from './contexts/UserName';
import Layout from './layout';
import CurrentUser from './components/CurrentUser';
import QuestionCard from './components/QuestionCard';

const App: React.FC = () => {
  const [test, setTest] = useState<Question>()
  useEffect(() => setTest(useGetRandomQuestion()), [])

  return (
    <UserNameContextWrapper>
      <Layout>
        {test && <QuestionCard question={test} />}
      </Layout>
    </UserNameContextWrapper>
  );
}

export default App