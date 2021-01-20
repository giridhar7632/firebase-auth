import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {
    login,
    signinWithGitHub,
    signinWithGoogle,
    signinWithFacebook,
    signinAnonymously,
  } = useAuth();
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
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  // sign in with github
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
  // sign in with google
  async function googleSignIn(e) {
    try {
      setError("");
      setLoading(true);
      await signinWithGoogle();
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  // sign in with facebook
  function facebookSignIn(e) {
    try {
      setError("");
      setLoading(true);
      signinWithFacebook();
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  // sign in anonymously
  function anonymousSignIn(e) {
    try {
      setError("");
      setLoading(true);
      signinAnonymously();
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <h3 className="w-responsive text-center mx-auto mb-4 p-3 mt-2">Log In</h3>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row className="w-75 mx-auto text-center pt-2 mb-5">
            <Col>
              <img
                src="https://cloud-fm947y3ba.vercel.app/2google.svg"
                alt="google"
                style={imgStyles}
                onClick={googleSignIn}
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
                onClick={facebookSignIn}
              />
            </Col>
            <Col>
              <img
                src="https://cloud-rk0r5kzax.vercel.app/0anonymous.svg"
                alt="anonymous"
                style={imgStyles}
                onClick={anonymousSignIn}
              />
            </Col>
          </Row>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              className="w-100"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        No account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
