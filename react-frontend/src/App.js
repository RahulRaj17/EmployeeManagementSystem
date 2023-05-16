import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import List from "./components/List";
import Box from '@mui/material/Box';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <Box>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<List />} />
          <Route exact path='/employees' element={<List />} />
          <Route exact path='/add-employee' element={<AddEmployee heading="ADD EMPLOYEE"/>} />
          <Route exact path='/update-employee/:id' element={<AddEmployee heading="UPDATE EMPLOYEE"/>} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
