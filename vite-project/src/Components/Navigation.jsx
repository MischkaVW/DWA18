import Fuse from "fuse.js";
import { useState } from "react";
import PosterList, { Genre } from "./ListPoster"; 

export const NavBar = () => {
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [sortByDate, setSortByDate] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [filteredGenre, setFilteredGenre] = useState("");

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleSortByDateChange = (order) => {
    setSortByDate(order);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleGenreFilter = (genre) => {
    setFilteredGenre(genre);
  };

  const handleClearFilters = () => {
    setSortOrder("A-Z");
    setSortByDate("asc");
    setFilterText("");
    setFilteredGenre("");
  };

  // Assuming posterData contains the list of shows to be filtered and sorted
  const filteredAndSortedData = () => {
    let filteredData = posterData;

    // Apply genre filter if selected
    if (filteredGenre) {
      filteredData = filteredData.filter((podcast) =>
        podcast.genres.includes(Number(filteredGenre))
      );
    }

    // Apply title filter
    if (filterText) {
      const fuse = new Fuse(filteredData, { keys: ["title"] });
      filteredData = fuse.search(filterText).map((result) => result.item);
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (sortByDate === "asc") {
        return new Date(a.updated) - new Date(b.updated);
      } else {
        return new Date(b.updated) - new Date(a.updated);
      }
    });

    // Apply A-Z or Z-A sorting based on title
    if (sortOrder === "A-Z") {
      filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "Z-A") {
      filteredData.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filteredData;
  };

  return (
    <div className="navbar">
      <div className="sorting-options">
        <button onClick={() => handleSortOrderChange("A-Z")}>
          Sort A-Z
        </button>
        <button onClick={() => handleSortOrderChange("Z-A")}>
          Sort Z-A
        </button>
        <button onClick={() => handleSortByDateChange("asc")}>
          Sort by Date (Asc)
        </button>
        <button onClick={() => handleSortByDateChange("desc")}>
          Sort by Date (Desc)
        </button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <div className="filtering-options">
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Filter by title..."
        />
        <div>
          {Object.keys(Genre).map((genreId) => (
            <button
              key={genreId}
              onClick={() => handleGenreFilter(genreId)}
              className={filteredGenre === genreId ? "active" : ""}
            >
              {Genre[genreId]}
            </button>
          ))}
        </div>
      </div>
      <PosterList data={filteredAndSortedData()} />
    </div>
  );
};