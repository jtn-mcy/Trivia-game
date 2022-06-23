import React, { useContext } from 'react'
import { UserNameContext } from '../../contexts/UserName'
import { useAppSelector } from '../../api'

const CurrentUser: React.FC = () => {
  const { userName } = useContext(UserNameContext)
  const isPlaying = useAppSelector(state => state.question.inPlay)

  return (
    <>
      <h2>{(userName && isPlaying) ? `Playing as ${userName}` : 'No user playing'}</h2>
    </>
  )
}

export default CurrentUser