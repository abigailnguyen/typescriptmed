import React, {useState} from 'react';
import { flushSync } from 'react-dom';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setTimeout(() => { // a single re-render by a single click
            setCount(count => count + 1);
            setToggle(toggle => !toggle);
        }, 10);
    };

    const handleClickMultipleRerender = () => {
        flushSync(() => { // as soon as the callback finishes the dom is flushed and re rendered
            setCount(count => count + 1);
        });

        flushSync(() => {
            setToggle(toggle => !toggle);
        });
    };

    console.log('Rendered', count, toggle);

    return (
        <div className="App">
            <button onClick={handleClick}>Click Me</button>
            <div>Count: {count}</div>
            <div>Toggle: {toggle.toString()}</div>
        </div>
    );
}

export default App;