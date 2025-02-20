import React from 'react'

const Title = ({title}) => {
  return (
    <div className='w-full py-6  text-3xl text-center font-semibold capitalize ' data-aos="fade-in">

        <h1>{title}</h1>
    </div>
  )
}

export default Title