import React from 'react'

const Header = ({header}) => {
  return (
     <div className='py-2 px-3 inline-flex justify-evenly rounded-full items-center text-lg bg-secondary w-fir text-white text-center shadow-xl shadow-accent font-bold tracking-wider uppercase'>
      <h1>{header}</h1>
      </div>
  )
}

export default Header