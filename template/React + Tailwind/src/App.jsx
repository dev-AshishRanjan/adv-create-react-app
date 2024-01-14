import { useState } from 'react';
import javascriptLogo from './assets/javascript.svg';
import tailwindLogo from './assets/tailwind.svg';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className='inline-block'>
          <img src={viteLogo} className="h-40 p-[1.5em] transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] " alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer" className='inline-block'>
          <img src={reactLogo} className="h-40 p-[1.5em] transition-all duration-300 animate-[spin_20s_linear_infinite] hover:drop-shadow-[0_0_2em_#61dafbaa] will-change-auto" alt="JavaScript logo" />
        </a>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          target="_blank"
          rel="noreferrer" className='inline-block'
        >
          <img src={javascriptLogo} className="h-40 p-[1.5em] transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="React logo" />
        </a>
        <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer" className='inline-block'>
          <img src={tailwindLogo} className="h-40 p-[1.5em] transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Tailwind logo" />
        </a>
      </div>
      <h1>Vite + React + JS + Tailwind</h1>
      <div className="p-[2em]">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the Vite, React, JavaScript and Tailwind logos to learn more
      </p>
    </>
  );
}

export default App;
