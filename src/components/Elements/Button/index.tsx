import React from 'react'

interface IButton {
    text: string;
}

const Button:React.FC<IButton> = ({ text }) => {
  return (
    <button className='p-2 rounded bg-primary text-white font-medium'>{ text }</button>
  )
}

export default Button