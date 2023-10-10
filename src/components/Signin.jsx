import { Card, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      signin(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Sign in</h2>
      <div style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <Button className="w-100" type="submit">
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
