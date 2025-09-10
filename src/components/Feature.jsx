import React from 'react';
import "../App.css";

function Feature({title, number}) {
  return (
    <div className='detail'>
        <h2>{title}</h2>
        <p>{number}</p>
    </div>
  )
}

export default Feature;