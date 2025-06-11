// import React, { useState } from "react";
// import { Form, Button} from 'react-bootstrap';
// import { useNavigate,Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { authentication } from "../../Configuration/Config";

// const Login = () => {
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         authentication,
//         loginDetails.email,
//         loginDetails.password
//       );

//       const user = userCredential.user;

//        alert("Login successful!");
//       localStorage.setItem("LoggedInUser", JSON.stringify(user));
//        alert("Login successful!");
//       navigate("/dashboard"); // redirect to dashboard or home
//     } catch (error) {
//       console.error("Login failed:", err);
//       // alert("Login failed: " + err.message);
//     }
//   };

//   return (

//     <Form onSubmit={handleLoginSubmit} style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
//       <h3 className="text-center mb-4">Login</h3>

//       <Form.Group className="mb-3" controlId="loginEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={loginDetails.email}
//           onChange={(e) =>
//             setLoginDetails({ ...loginDetails, email: e.target.value })
//           }
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="loginPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Enter password"
//           value={loginDetails.password}
//           onChange={(e) =>
//             setLoginDetails({ ...loginDetails, password: e.target.value })
//           }
//           required
//         />
//       </Form.Group>

//       <Button variant="success" type="submit" className="w-100">
//         Login
//       </Button>
//           <Link to ="/SignUp">Don't have Account Please SignUp </Link>
//     </Form>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../Configuration/Config";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        loginDetails.email,
        loginDetails.password
      );

      const user = userCredential.user;

      alert("Login successful!");
      localStorage.setItem("LoggedInUser", JSON.stringify(user));
      navigate("/dashboard"); // redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f2f5"
      }}
    >
      <Form
        onSubmit={handleLoginSubmit}
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Login
        </Button>

        <div className="text-center mt-3">
          <Link to="/signup">Don't have an account? <strong>Sign Up</strong></Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;



