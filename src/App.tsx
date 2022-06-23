import React, {useEffect} from 'react';
import { useAppSelector } from "./api";
import './styles/_global.scss';
import UserNameContextWrapper from './contexts/UserName';
import Layout from './layout';
import QuestionCard from './components/QuestionCard';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HighScores from './pages/HighScores';
import { getAppStartupScores } from './utils/LocalScorage';

const App: React.FC = () => {
  const inPlay = useAppSelector(state => state.question.inPlay);
  useEffect(() => getAppStartupScores(), []);
  return (
    <UserNameContextWrapper>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={inPlay ? <QuestionCard /> : <Home />} />
          <Route path='/highscores' element={<HighScores />}/>
          <Route path='*' element={<Home />} />
        </Routes>
      </Layout>
    </UserNameContextWrapper>
  );
};

export default App;