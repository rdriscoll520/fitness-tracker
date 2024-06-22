import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SidebarContainer, SidebarLink, SidebarTitle } from './styles/SideBarStyles.js';
import WeightForm from './components/WeightForm.js';
import WeightHistory from './components/WeightHistory.js';
import UsernameForm from './components/UsernameForm.js';
import { useState } from 'react';
import { MenuIcon, PlusIcon, DropdownMenu } from './styles/IconStyles.js';
import GlobalStyle from './styles/GlobalStyles.js';
import Home from './components/Home.js';
import SignIn from './components/SignIn.js'
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import CreateAccount from './components/CreateAccount.js';

function App() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Header /> 
        <MenuIcon onClick={toggleSidebar} style={{ position: 'fixed', zIndex: '100', left: `${isSidebarOpen ? '250px' : '10px'}`, top: '10px' }}>
          <span></span>
        </MenuIcon>
        <PlusIcon onClick={toggleDropdown}>+</PlusIcon>
        {isDropdownOpen && (
          <DropdownMenu>
            <Link to="/add-weight" onClick={() => setDropdownOpen(false)}>Add Weight</Link>
          </DropdownMenu>
        )}
        <SidebarContainer isOpen={isSidebarOpen}>
          <SidebarTitle>Fitness Tracker</SidebarTitle>
          <Link to="/"><SidebarLink>Home</SidebarLink></Link>
          <Link to="/add-weight"><SidebarLink>Add Weight</SidebarLink></Link>
          <Link to="/weight-history"><SidebarLink>Weight History</SidebarLink></Link>
        </SidebarContainer>

        <div style={{ marginLeft: `${isSidebarOpen ? '250px' : '0'}`, padding: '20px', transition: 'margin-left 0.3s ease-in-out' }}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/add-weight" element={<WeightForm />} />
            <Route path="/weight-history" element={<WeightHistory />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element = {<CreateAccount />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
