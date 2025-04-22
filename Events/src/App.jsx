import { Route, Routes} from 'react-router'
import '../src/App.css'
import Header from './Components/Header'
import { EventsList } from './Components/EventsList'
import {SingleEvent} from './Components/SingleEvent'

function App() {


  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<EventsList/>}/>
      <Route path="/events/:event_id" element={<SingleEvent/>}/>
    </Routes>
    </>
  )
}

export default App
