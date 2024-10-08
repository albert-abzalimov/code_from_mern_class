import "./App.css";
import { useState } from "react";

const jokesArray = [
  { joke: "Why did the JavaScript developer quit his job? Because he didn't get arrays!", likes: 0 },
  { joke: "Why do JavaScript developers prefer promises over callbacks? Because they don't like to be kept waiting!", likes: 0 },
  { joke: "What's the object-oriented way to become wealthy in JavaScript? Inheritance!", likes: 0 },
  { joke: "Why did the JavaScript function go to therapy? It had too many anonymous functions calling it!", likes: 0 },
  { joke: "What's a programmer's favorite hangout place? Foo Bar!", likes: 0 },
  { joke: "Why did the JavaScript developer go broke? Because he lost his prototypes!", likes: 0 },
  { joke: "Why did the function and the array go to couples therapy? They had trouble understanding each other's scope!", likes: 0 },
  { joke: "Why do JavaScript programmers prefer the dark mode? Because they like to code with reduced light pollution!", likes: 0 },
  { joke: "What's a JavaScript developer's favorite dance move? The Callback!", likes: 0 },
  { joke: "Why did the JavaScript code go to rehab? Because it had too many dependencies!", likes: 0 },
];

function App() {
  const [jokes, setJokes] = useState(jokesArray);
  const [curJoke, setCurJokeIndex] = useState(0);

  const handleLike = (index) => {
    const newJokes = [...jokes];
    newJokes[index] = { ...newJokes[index], likes: newJokes[index].likes + 1 };
    setJokes(newJokes);
  };

  const getNextJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurJokeIndex(randomIndex);
  };

  const mostLikedJoke = jokes.reduce((prev, cur) =>
    prev.likes > cur.likes ? prev : cur
  );

  return (
    <div className="app">
      <div className="joke-box">
        <p className="joke-text">{jokes[curJoke].joke}</p>
        <button className="like-button" onClick={() => handleLike(curJoke)}>
          ❤️ {jokes[curJoke].likes}
        </button>
        <button className="next-button" onClick={getNextJoke}>
          Next Joke
        </button>
        <div>
          <h3>Most Liked Joke</h3>
          <p>{mostLikedJoke.joke}</p>
          <p>❤️ {mostLikedJoke.likes}</p>
        </div>
      </div>

    </div>
  );
}

export default App;
