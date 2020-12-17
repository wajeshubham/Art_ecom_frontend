import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  Input,
  Button,
  CardGroup,
  Form,
  FormGroup,
  Label,
  CardHeader,
  Row,
} from "reactstrap";
import Axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
import { server } from "../utils/server";
import { message } from "antd";
import GoogleLogin from "react-google-login";
import { FaFontAwesome, FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const context = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const fetchDetails = async () => {
    try {
      await Axios.post(`${server}/users/login/`, {
        username: username,
        password: password,
      })
        .then((res) => {
          context.setUser(res.data.data);

          const success = () => {
            message.success({
              content: "Logged in successfully!",
              className: "custom-class",
              style: {
                marginTop: "8vh",
              },
            });
          };
          success();
          if (res.data.data.profile.profile_pic) {
            history.push("/home");
          }
        })
        .catch((err) => {
          toast("Invalid login credentials", {
            type: "error",
            position: "top-center",
          });
          const success = () => {
            message.error({
              content: "Unable to login with provided credentials.",
              className: "custom-class",
              style: {
                marginTop: "8vh",
              },
            });
          };
          success();
        });
    } catch (error) {
      toast("Invalid login credentials", {
        type: "error",
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("profile_pic");
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(context.user));
  }, [fetchDetails]);

  if (context.user !== null) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Container className="login-cont" fluid>
        <Card
          className="py-4 login-card"
          style={{
            display: "flex",
            justifyContent: "column",
            alignItems: "center",
            width: "30%",
            padding: "50px",
            position: "absolute",
            right: "77vh",
            top: "15vh",
          }}
        >
          <CardGroup>
            <p style={{ fontSize: "20px" }}>Log In</p>
          </CardGroup>
          <CardGroup>
            <Form className="signup-form">
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
                  style={{ width: "400px" }}
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
                    Password
                  </p>
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password..."
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <p className="fp" style={{ fontSize: "11px", marginBottom: 0 }}>
                  <Link to="/password-reset">Forgot password?</Link>
                </p>
              </FormGroup>
              <FormGroup
                row
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  className="mt-2 btn-block"
                  block
                  style={{
                    backgroundColor: "#1890ff",
                    border: "none",
                  }}
                  onClick={fetchDetails}
                >
                  Log in
                </Button>
              </FormGroup>

              {/* <FormGroup
                row
                style={{ display: "flex", justifyContent: "center" }}
              >
                <GoogleLogin
                  render={(renderProps) => (
                    <>
                      <Button
                        className="btn-block g-button"
                        onClick={renderProps.onClick}
                      >
                        <div
                          className="row"
                          style={{ marginLeft: "95px", alignItems: "center" }}
                        >
                          <img
                            width="20px"
                            style={{ marginRight: 10 }}
                            alt="Google sign-in"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                          />
                          Login with Google
                        </div>
                      </Button>
                    </>
                  )}
                  clientId="232565428406-p62gh2isogehgp1p4i6in8d9n6aijm01.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </FormGroup> */}
              <p
                className="mb-0 mt-0 text-sm-center text-black-100 login-txt"
                style={{ fontSize: "12px" }}
              >
                Don't have an account? <a href="/register">Register here</a>{" "}
              </p>
            </Form>
          </CardGroup>
        </Card>
      </Container>
    );
  }
};

export default SignIn;
