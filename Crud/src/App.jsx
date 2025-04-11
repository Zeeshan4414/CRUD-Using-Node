import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewBooks from "./assets/Components/NewBooks";
import Update from "./assets/Components/Update";
import Books from "./assets/Components/Books";
import Nav from './assets/Components/Nav';
import './App.css'
function App() {

  return (
    <>
      <Router>
        <Nav />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/create" element={<NewBooks />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
