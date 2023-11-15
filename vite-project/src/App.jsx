// App.jsx

import './App.css'
import PosterList from './Components/ListPoster'
import { NavBar } from './Components/Navigation'

 export default function App() {
  return(
    <div>
      <NavBar />
      <PosterList />
    </div>
  )
 }
