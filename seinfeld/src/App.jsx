/* eslint-disable react/prop-types */
import "./App.css"


const ShowTitle = (props) => {
  return <h1>{props.title}</h1>
}

const ShowSeasonViews = (props) => {
  return <p>
    Season 1, Number of Views {props.episodes.reduce((total, episode) => total + episode.views, 0)}
  </p>
}



const Episode = (props) => {
  return (
    <p>
      {props.title} {props.views}
    </p>
  )
}

const Episodes = (props) => {
  // Example episode data

  return (
    <div>
    {props.episodes.map((episode, index) => (
      <Episode key={index} title={episode.title} views={episode.views} />
    ))}
    </div>
  )
}

const App = () => {
  const seinfeldSeason1 = {
    season: "Seinfeld Season 1",
    episodes: [
      { title: "Good News, Bad News", views: 6905040 },
      { title: "The Stakeout", views: 3905040 },
      { title: "The Robbery", views: 4498237 }]
  };


  return (
    <div>
      <ShowTitle title={seinfeldSeason1.season} />
      <Episodes episodes = {seinfeldSeason1.episodes}/>
      <ShowSeasonViews episodes = {seinfeldSeason1.episodes} />
    </div>
  );
};

export default App;
