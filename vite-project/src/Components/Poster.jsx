import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Poster(props) {
  return (
    <div className="poster">
      <h2>{props.titles}</h2>
      <img src={props.images} className="images" />
      <p> Seasons: {props.season}</p>
      <p>Genres: {props.genre}</p>
      <p>Updated: {props.updates}</p>
      <img src="./i.png" className="icon-" />
      <img src="./" className="icon" />
    </div>
  );
}