import { useState, useEffect } from "react";
import Poster from "./Poster";


export const Genre = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family", 
};

 export default function PosterList() {
    const [posterData, setPosterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(res => res.json())
      .then(data => {
        setPosterData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false);
      });
  }, []);

  {/*formatDate */}
  const formatDate = (isDate) => {
    const date = new Date(isDate)
    const options = {year: "numeric", month: "long", day: "numeric"}
    return date.toLocaleDateString(undefined, options)
  }

return (
    <div className="poster-grid">
        {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {posterData.map((podcast) => (
            <Poster
              key={podcast.id}
              id={podcast.id}
              titles={podcast.title}
              descriptions={podcast.description}
              season={podcast.seasons}
              images={podcast.image}
              genre={podcast.genres.map((id) => Genre[id]).join(", ") || "unknown"}
              updates={formatDate(podcast.updated)}
            />
          ))}
        </div>
      )}
        </div>
)
}