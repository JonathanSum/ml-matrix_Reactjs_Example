
import logo from './logo.svg';
import './App.css';
import Canvas from './component/canvas'

import React, { useEffect } from 'react'
import P5 from './component/p5'


import draw from './draw/draw.js'


// const matrix = Matrix.ones(5, 5);

// console.log(matrix.data[0][0])

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/ml-matrix@6.8.0/matrix.umd.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  console.log(window)
  return (

    <div>
      {/* <Canvas draw={draw} /> */}
      <P5 />
    </div>
  )
}

export default App;
