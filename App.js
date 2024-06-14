import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SidebarContainer, SidebarLink, SidebarTitle } from './styles/SideBarStyles.js';
import WeightForm from './components/weight_form';
import WeightHistory from './components/weight_history';
import UsernameForm from './components/username_form';
import { useState } from 'react';
import { MenuIcon, PlusIcon, DropdownMenu } from './styles/IconStyles.js';
import GlobalStyle from './styles/GlobalStyles.js';
import { HeaderContainer, HeaderTitle } from './styles/HeaderStyles.js';

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
    <Router>
      <GlobalStyle />
      <HeaderContainer>
        <HeaderTitle>Fitness Tracker</HeaderTitle>
      </HeaderContainer>
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
          <Route path="/add-weight" element={<WeightForm />} />
          <Route path="/weight-history" element={<WeightHistory />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
