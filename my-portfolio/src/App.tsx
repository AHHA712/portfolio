import {Routes, Route} from 'react-router-dom'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Info from './sections/Info'
import Navbar from './components/Navbar'

const App: React.FC = () =>{
  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white', // or #f9f9f9 etc.
          padding: '0 0',
          textAlign: 'center',
          borderBottom: '1px solid #eee',
        }}
      >
      <h1 style={{
        color:'black',
        fontSize:"40px",
        textAlign:"center",
        fontWeight:"bold",
        fontFamily:  "'Great Vibes', cursive",
        margin: '0 0 1.25rem 0',
        padding: '10 0'
      }}
      >Arnold's Portfolio</h1>
      <Navbar/>
      </header>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/projects" element = {<Projects />}/>
        <Route path="/contact" element = {<Contact />}/>
        <Route path="/info" element = {<Info />}/>
        <Route path="/experience" element = {<Experience />}/>
      </Routes>
    </>
  )
}

export default App