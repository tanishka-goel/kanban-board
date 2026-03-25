import React from 'react'

const Header = ({header}) => {
  return (
     <div className='py-2 px-3 inline-flex justify-evenly rounded-lg items-center text-md bg-linear-to-r from-indigo-950/70 via-secondary to-indigo-950 w-fit text-white text-center shadow-xl shadow-accent font-bold tracking-wider uppercase'>
      <h1>{header}</h1>
      </div>
  )
}

export default Header