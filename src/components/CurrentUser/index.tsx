import React, { useContext } from 'react'
import { UserNameContext } from '../../contexts/UserName'


const CurrentUser: React.FC = () => {
  const { userName, setUserName } = useContext(UserNameContext)

  return (
    <>
      <input type='text' value={userName} onChange={e => setUserName(e.target.value)} />
      <h2>{userName}</h2>
    </>
  )
}

export default CurrentUser