import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
//import { Link } from 'react-router-dom'

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value === passwordConfirmRef.current.value){
      return setErr("Passwords do not match")
    }
    try{
      setErr('')
      setLoading( true)
      await signUp(emailRef.current.value, passwordRef.current.value)
    }catch{
      setErr("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {err && <Alert variant="danger">{ err }</Alert>}
          <Form>
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
            <Button className="w-100" type="submit" onClick={handleSubmit} disabled={loading}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Login
      </div>
    </div>
  )
}

export default SignUp
