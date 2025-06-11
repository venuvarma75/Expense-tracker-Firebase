import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
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
        password:signUpDetails.password
        //  createdAt: new Date().toISOString()
      });

      alert("Signup successful and data saved in Firestore!");
      navigate("/login");
    } catch (err) {
      console.error
      // ("Signup Error:", err.message);
      // alert("Signup failed: " + err.message);
    }
  };

  return (
    <Form id="SignUpForm" onSubmit={handleSignUpSubmit}>
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

      <Form.Group className="mb-3">
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

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUp;
