import {Routes, Route} from 'react-router-dom'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Navbar from './components/Navbar'

const App: React.FC = () =>{
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/projects" element = {<Projects />}/>
        <Route path="/contact" element = {<Contact />}/>
      </Routes>
    </>
  )
}

export default App