import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authentication } from "../../Configuration/Config";
import { Button } from "react-bootstrap";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      localStorage.removeItem("LoggedInUser");
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    }
  };

  return (
//      <Form onSubmit={handleLogout} style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
//       <h3 className="text-center mb-4">Login</h3>

//       <Form.Group className="mb-3" controlId="logoutEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={logoutDetails.email}
//           onChange={(e) =>
//             setLogoutDetails({ ...logoutDetails, email: e.target.value })
//           }
//           required
//         />

//       </Form.Group>

//       <Form.Group className="mb-3" controlId="logoutPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Enter password"
//           value={logoutDetails.password}
//           onChange={(e) =>
//             setLogoutDetails({ ...logoutDetails, password: e.target.value })
//           }
//           required
//         />
//       </Form.Group>

//       <Button variant="success" type="submit" className="w-100">
//         Logout
//       </Button>
//           {/* <Link to ="/Login"> Login</Link> */}
          
// </Form>
<div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px", textAlign: "center" }}>
      <h3 className="mb-4">Logout</h3>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>

  );
};

export default Logout;
