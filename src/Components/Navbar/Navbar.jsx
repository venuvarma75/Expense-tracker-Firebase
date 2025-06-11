// // import React from 'react';
// // import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';
// // import './Navbar.css';

// // const Navbarr = () => {
// //   return (
// //     <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
// //       <Container>
// //         <Navbar.Brand as={Link} to="/" className="brand">
// //           💸 Expense Tracker
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls="navbar-nav" />
// //         <Navbar.Collapse id="navbar-nav">
// //           <Nav className="ms-auto nav-links">
// //             <Link to="/dashboard" className="nav-item-link">Dashboard</Link>
// //             <Link to="/add-expense" className="nav-item-link">Add Expense</Link>
// //             <Link to="/expenseschart" className="nav-item-link">Charts</Link>
// //             <Link to="/transactionList" className="nav-item-link">Transactions</Link>
// //             <Link to="/budgetalert" className="nav-item-link">Budget Alert</Link>
// //             <Link to="/signup" className="nav-item-link">Sign Up</Link>
// //             <Link to="/login" className="nav-item-link">Login</Link>
// //             <Link to="/logout" className="nav-item-link">Logout</Link>
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Navbarr;


// // import React from 'react';
// // import { Navbar, Nav, Container } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';
// // import './Navbar.css';

// // const Navbarr = () => {
// //   const loggedInUser = localStorage.getItem("LoggedInUser");

// //   return (
// //     <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
// //       <Container>
// //         <Navbar.Brand as={Link} to="/" className="brand">
// //           💸 Expense Tracker
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls="navbar-nav" />
// //         <Navbar.Collapse id="navbar-nav">
// //           <Nav className="ms-auto nav-links">
// //             <Link to="/dashboard" className="nav-item-link">Dashboard</Link>
// //             <Link to="/add-expense" className="nav-item-link">Add Expense</Link>
// //             <Link to="/expenseschart" className="nav-item-link">Charts</Link>
// //             <Link to="/transactionList" className="nav-item-link">Transactions</Link>
// //             <Link to="/budgetalert" className="nav-item-link">Budget Alert</Link>

// //             {!loggedInUser ? (
// //   <>
// //     <Link to="/signup" className="nav-item-link">Sign Up</Link>
// //     <Link to="/login" className="nav-item-link">Login</Link>
// //   </>
// // ) : (
// //   <>
// //     <Link to="/logout" className="nav-item-link">Logout</Link>
// //   </>
// // )}

// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Navbarr;

// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbarr = () => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = () => {
//       const user = localStorage.getItem("LoggedInUser");
//       setLoggedIn(!!user);
//     };

//     checkLogin();

//     // Listen for login/logout changes using storage event (for other tabs)
//     window.addEventListener("storage", checkLogin);

//     // Optional: use setInterval if login/logout is in the same tab
//     const interval = setInterval(checkLogin, 1000);

//     return () => {
//       window.removeEventListener("storage", checkLogin);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="brand">
//           💸 Expense Tracker
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto nav-links">
//             <Link to="/dashboard" className="nav-item-link">Dashboard</Link>
//             <Link to="/add-expense" className="nav-item-link">Add Expense</Link>
//             <Link to="/expenseschart" className="nav-item-link">Charts</Link>
//             <Link to="/transactionList" className="nav-item-link">Transactions</Link>
//             <Link to="/budgetalert" className="nav-item-link">Budget Alert</Link>

//             {!loggedIn ? (
//               <>
//                 <Link to="/signup" className="nav-item-link">Sign Up</Link>
//                 <Link to="/login" className="nav-item-link">Login</Link>
//               </>
//             ) : (
//               <Link to="/logout" className="nav-item-link">Logout</Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbarr;





import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbarr = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
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
    <Navbar expand="lg" className={`shadow-sm custom-navbar ${darkMode ? 'dark-navbar' : 'light-navbar'}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          💸 <span className="brand-name">Expense Tracker</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
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
              >
                {link.label}
              </Link>
            ))}

            {!loggedIn ? (
              <>
                <Link to="/signup" className="nav-item-link">Sign Up</Link>
                <Link to="/login" className="nav-item-link">Login</Link>
              </>
            ) : (
              <Link to="/logout" className="nav-item-link">Logout</Link>
            )}
            <Button variant="outline-light" className="theme-toggle-btn" onClick={toggleTheme}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
