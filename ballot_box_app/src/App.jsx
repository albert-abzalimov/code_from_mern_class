/* eslint-disable react/prop-types */
import republican from "./republican.png";
import democratic from "./democratic.png";
import american from "./american.png";
import "./App.css";

import { useState } from "react";

const images = {
  "republicans": republican,
  "democrats": democratic,
  "independent": american
};


// Component for casting votes
const VoteBox = ({ partyName, votes, handleVote }) => {
  return (
    <div className="party">
      <h2>{partyName}</h2>
      <div>
        <img src={images[partyName.toLowerCase()]} className="party-image" />
        <br />
        <button className="vote-button" onClick={handleVote}>
          Vote
        </button>
        <p className="vote-count">Vote Count: {votes}</p>
      </div>
    </div>
  );
};


// Component for displaying election results
const ElectionResults = ({
  totalVotes,
  democraticVotes,
  republicanVotes,
  independentVotes,
}) => {
  // Function to calculate the percentage of votes for a given party
  const calculatePartyPercentage = (partyVotes, totalVotes) => {
    return totalVotes ? ((partyVotes / totalVotes) * 100).toFixed(2) : 0;
  };
  const democraticPercentage = calculatePartyPercentage(democraticVotes, totalVotes);
  const republicanPercentage = calculatePartyPercentage(republicanVotes, totalVotes);
  const independentPercentage = calculatePartyPercentage(independentVotes, totalVotes);
  return totalVotes === 0 ? (
    <div className="results-box">
      <h2>Election Results</h2>
      <p style = {{color: "red"}}>No votes have been cast yet.</p>
    </div>
  ) : (
    <div className="results-box">
      <h2>Election Results</h2>
      <p>Total Votes: {totalVotes}</p>
      <p>Democrats: {democraticVotes} votes ({democraticPercentage}%)</p>
      <p>Republicans: {republicanVotes} votes ({republicanPercentage}%)</p>
      <p>Independents: {independentVotes} votes ({independentPercentage}%)</p>
    </div>
  );
};

const App = () => {
  const [democraticVotes, setDemocraticVotes] = useState(0);
  const [republicanVotes, setRepublicanVotes] = useState(0);
  const [independentVotes, setIndependentVotes] = useState(0);

  const totalVotes = democraticVotes + republicanVotes + independentVotes;

  // Event handler functions to increment vote count
  const handleDemocraticVote = () => setDemocraticVotes(democraticVotes + 1);
  const handleRepublicanVote = () => setRepublicanVotes(republicanVotes + 1);
  const handleIndependentVote = () => setIndependentVotes(independentVotes + 1);

  return (
    <div>
      <div className="party-container">
        {/* Voting Section */}
        <VoteBox
          partyName="Democrats"
          votes={democraticVotes}
          handleVote={handleDemocraticVote}
        />
        <VoteBox
          partyName="Republicans"
          votes={republicanVotes}
          handleVote={handleRepublicanVote}
        />
        <VoteBox
          partyName="Independent"
          votes={independentVotes}
          handleVote={handleIndependentVote}
        />
      </div>
      <div>
        {/* Results Section */}
        <ElectionResults
          totalVotes={totalVotes}
          democraticVotes={democraticVotes}
          republicanVotes={republicanVotes}
          independentVotes={independentVotes}
        />
      </div>
    </div>
  );
};

export default App;

