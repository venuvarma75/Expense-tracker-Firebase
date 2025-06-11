import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { authentication, db } from "../../Configuration/Config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        signUpDetails.email,
        signUpDetails.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: signUpDetails.email,
        password: signUpDetails.password
      });

      alert("Signup successful and data saved in Firestore!");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.message);
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f2f5",
        padding: "10px"
      }}
    >
      <Form
        onSubmit={handleSignUpSubmit}
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
