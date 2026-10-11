import { useState } from 'react';
import './App.css';

function App() {
const [text, setText] = useState('');

return ( <div className="container"> <h1>Live Text Display</h1>


  <h2>{text}</h2>

  <input
    type="text"
    placeholder="Type something here..."
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
</div>


);
}

export default App;
