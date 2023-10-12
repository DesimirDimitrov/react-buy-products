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
    <div style={{ margin: "1rem" }}>
      <h2>ВХОД</h2>
      <div style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Електронна поща</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Парола</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <br />
              <Button className="w-100" type="submit">
                ВХОД
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
