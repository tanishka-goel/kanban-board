import React from 'react'

const Header = ({header}) => {
  return (
     <div className='py-2 px-3 inline-flex justify-evenly rounded-full items-center text-lg bg-linear-to-r from-indigo-950 via-secondary to-indigo-950 w-fir text-white text-center shadow-xl shadow-accent font-bold tracking-wider uppercase'>
      <h1>{header}</h1>
      </div>
  )
}

export default Header