import { useState } from 'react'
import javascriptLogo from './assets/javascript.svg'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="JavaScript logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={javascriptLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + JS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and JavaScript logos to learn more
      </p>
    </>
  )
}

export default App
