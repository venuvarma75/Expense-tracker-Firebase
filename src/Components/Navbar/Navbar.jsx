import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbarr = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [expanded, setExpanded] = useState(false); // 👈 New state to track navbar open/close
  const location = useLocation();

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("LoggedInUser");
      setLoggedIn(!!user);
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);

    checkLogin();
    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 1000);

    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.className = newMode ? "dark-theme" : "light-theme";
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className={`shadow-sm custom-navbar ${darkMode ? 'dark-navbar' : 'light-navbar'}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          💸 <span className="brand-name">Expense Tracker</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? '✖' : '☰'}
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-links">
            {[
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/add-expense', label: 'Add Expense' },
              { to: '/expenseschart', label: 'Charts' },
              { to: '/transactionList', label: 'Transactions' },
              { to: '/budgetalert', label: 'Budget Alert' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-item-link ${location.pathname === link.to ? 'active-link' : ''}`}
                onClick={() => setExpanded(false)} // Close navbar on link click
              >
                {link.label}
              </Link>
            ))}

            {!loggedIn ? (
              <>
                <Link to="/signup" className="nav-item-link" onClick={() => setExpanded(false)}>Sign Up</Link>
                <Link to="/login" className="nav-item-link" onClick={() => setExpanded(false)}>Login</Link>
              </>
            ) : (
              <Link to="/logout" className="nav-item-link" onClick={() => setExpanded(false)}>Logout</Link>
            )}

            <Button
              variant="outline-light"
              className="theme-toggle-btn"
              onClick={toggleTheme}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;

