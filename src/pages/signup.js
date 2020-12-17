import React, { useContext, useState, useEffect } from "react";
import { Link as Lnk } from "react-router-dom";
import { message } from "antd";
import { server } from "../utils/server";

import Axios from "axios";
import UserContext from "../context/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import {
  Container,
  Card,
  Input,
  Button,
  CardGroup,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();

  const validate = (event) => {
    event.preventDefault();
    var pass = password;
    var reg = new RegExp(
      "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{7,20}$"
    );
    var test = reg.test(pass);

    if (test) {
      setIsValid(true);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await Axios.post(`${server}/users/register/`, {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: isValid ? password : ".",
        password2: isValid ? password2 : ".",
      }).then((res) => {
        if (res.data.status === 400) {
          const warning = () => {
            message.warning({
              content: `${res.data.data}`,
              className: "custom-class",
              style: {
                marginTop: "10vh",
              },
            });
          };
          warning();
        }
        if (res.data.data.token) {
          history.push("/login");
        }
      });
    } catch (error) {
      const warning = () => {
        message.error({
          content: `Enter a valid password`,
          className: "custom-class",
          style: {
            marginTop: "10vh",
          },
        });
      };
      warning();
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(context.user));
  }, [handleSignUp]);

  if (context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container className="text-center" fluid>
        <Card
          className="signup-card py-4"
          style={{
            alignItems: "center",
            width: "30%",
            padding: "50px",
            position: "absolute",
            right: "77vh",
            top: "15vh",
          }}
        >
          <CardGroup>
            <p style={{ fontSize: "20px" }}>Sign Up</p>
          </CardGroup>
          <CardGroup>
            <Form className="signup-form">
              <FormGroup row>
                <p className="txt-email py-0 my-0" style={{ fontSize: "12px" }}>
                  First name
                </p>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Enter your first name..."
                  value={firstName}
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <p className="txt-email py-0 my-0" style={{ fontSize: "12px" }}>
                  Last name
                </p>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Enter your last name..."
                  value={lastName}
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <p className="txt-email py-0 my-0" style={{ fontSize: "12px" }}>
                  Username
                </p>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username..."
                  value={username}
                  required={true}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <Label className="py-0 my-0" for="email">
                  <p
                    className="txt-email py-0 my-0"
                    style={{ fontSize: "12px" }}
                  >
                    Email
                  </p>
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email..."
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <Label className="py-0 my-0" for="email">
                  <p
                    className="txt-email py-0 my-0"
                    style={{ fontSize: "12px" }}
                  >
                    Set Password
                  </p>
                </Label>
                <Input
                  type="password"
                  name="password"
                  style={
                    isValid && password.length > 7
                      ? { border: "2px solid #5AC625" }
                      : { border: "2px solid #ff9999" }
                  }
                  id="password"
                  placeholder="Enter your Password..."
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={validate}
                />
                <div className="mt-2" style={{ textAlign: "left" }}>
                  <li style={{ fontSize: "9px" }}>
                    Must contains one digit from 0-9
                  </li>
                  <li style={{ fontSize: "9px" }}>
                    Must contains one lowercase and characters
                  </li>

                  <li style={{ fontSize: "9px" }}>
                    must contains one special symbols in the list{" "}
                    <span style={{ color: "red" }}>"@#$%"</span>
                  </li>
                  <li style={{ fontSize: "9px" }}>
                    length at least 7 characters
                  </li>
                </div>
              </FormGroup>
              <FormGroup row>
                <Label className="py-0 my-0" for="email">
                  <p
                    className="txt-email py-0 my-0"
                    style={{ fontSize: "12px" }}
                  >
                    Confirm Password
                  </p>
                </Label>
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  required={true}
                  placeholder="Enter your Password..."
                  style={
                    isValid && password.length > 7 && password === password2
                      ? { border: "2px solid #5AC625" }
                      : { border: "2px solid #ff9999" }
                  }
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                row
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  className="mt-3"
                  type="submit"
                  block
                  style={{
                    backgroundColor: "#1890ff",
                    width: "30%",
                    border: "none",
                  }}
                  onClick={handleSignUp}
                  disabled={!isValid}
                >
                  Sign Up
                </Button>
              </FormGroup>
              <p
                className="mb-0 mt-0 text-sm-center text-black-100"
                style={{ fontSize: "12px" }}
              >
                Already have an Account? <a href="/login">Log in here</a>{" "}
              </p>
              {/* <Button>Submit</Button> */}
            </Form>
          </CardGroup>
        </Card>
      </Container>
    );
  }
};

export default SignUp;
