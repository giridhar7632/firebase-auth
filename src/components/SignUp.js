import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, signinWithGitHub } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();

  const imgStyles = {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function githubSignIn(e) {
    try {
      setError("");
      setLoading(true);
      await signinWithGitHub();
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <h3 className="w-responsive text-center mx-auto mb-4 p-3 mt-2">
        Sign Up
      </h3>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Row className="w-75 mx-auto text-center pt-2 mb-5">
              <Col>
                <img
                  src="https://cloud-fm947y3ba.vercel.app/2google.svg"
                  alt="google"
                  style={imgStyles}
                />
              </Col>
              <Col>
                <img
                  src="https://cloud-fm947y3ba.vercel.app/0github.svg"
                  alt="github"
                  style={imgStyles}
                  onClick={githubSignIn}
                />
              </Col>
              <Col>
                <img
                  src="https://cloud-fm947y3ba.vercel.app/1facebook.svg"
                  alt="facebook"
                  style={imgStyles}
                />
              </Col>
            </Row>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              className="w-100"
              type="submit"
              color="teal"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
