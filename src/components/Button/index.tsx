import React from 'react';
import styles from './index.module.scss'

export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  btnType: 'NavButton' | 'Play'
}

const Button: React.FC<Button> = ({ text, btnType, ...props }) => {
  return (
    <button className={styles[btnType]} {...props}>{text}</button>
  )
}

export default Button