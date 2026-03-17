import React from 'react'

const Header = ({header}) => {
  return (
     <div className='py-2 justify-evenly rounded-full flex items-center text-lg bg-secondary w-70 text-white text-center shadow-xl shadow-accent font-bold tracking-wider uppercase'>
      <h1>{header}</h1>
      </div>
  )
}

export default Header