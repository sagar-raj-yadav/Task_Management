import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const [jokes,setjokes]=useState([]);

  useEffect(()=>{
    axios.get('api/jokes')       //vite.config.js ko check kar lena.
  .then((res)=>{
    setjokes(res.data )
  })
  .catch((err)=>{
    console.log(err)
  })
})

  return (
    <>
    <p>connect backend with frontend</p>
    <h1>length:{jokes.length}</h1>
      {
        jokes.map((joke,index)=>{
          return(
          <div key={joke.id}>
            <h3>{joke.name}</h3>
            <p>{joke.content}</p>
          </div>
          )
        })
      }
    </>
  )
}

export default App