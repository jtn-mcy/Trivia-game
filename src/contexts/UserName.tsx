import React, { createContext, useState } from 'react';

type Context = {
  userName: string,
  setUserName: React.Dispatch<React.SetStateAction<string>>
}

export const UserNameContext = createContext<Context>({ userName: '', setUserName: () => null });

const UserNameContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>('');

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameContextWrapper;