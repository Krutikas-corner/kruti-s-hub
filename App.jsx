import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState("");

  const quotes = [
    "Believe in yourself and you can achieve anything.",
    "Small steps every day lead to big results.",
    "Never give up, great things take time.",
    "Your only limit is your mind.",
    "Dream big and work hard.",
    "Be stronger than your excuses.",
    "Every day is a new opportunity.",
    "Success starts with self-belief."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function showQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }

  return (
    <div className="container">
      <div className="clock-box">
        <h1>Digital Clock 🕒</h1>

        <h2>{time.toLocaleTimeString()}</h2>

        <p>{time.toDateString()}</p>

        <button onClick={showQuote}>
          Get Daily Quote ✨
        </button>

        {quote && <div className="quote">{quote}</div>}

        <h3>Have a nice day! 💙</h3>
      </div>
    </div>
  );
}

export default App;