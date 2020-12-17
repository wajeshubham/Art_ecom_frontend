import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { useHistory, Redirect } from "react-router-dom";
import { Layout, message } from "antd";
import UserContext from "../context/UserContext";
import { server } from "../utils/server";
import Axios from "axios";

const CreateProfile = () => {
  const { Content } = Layout;
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const context = useContext(UserContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let profileData = new FormData();
      profileData.append("username", username);
      profileData.append("address", address);
      profileData.append("phone_no", phoneNo);
      profileData.append("bio", bio);
      profileData.append("first_name", firstName);
      profileData.append("last_name", lastName);

      if (changed === true) {
        profileData.append("profile_pic", profilePic);
      }

      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }

      await Axios({
        url: `${server}/users/profile/create/`,
        method: "POST",
        data: profileData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.data.data !== "Username already exist!") {
            history.push("/myprofile");
          } else {
            const error = () => {
              message.error({
                content: "Username already exist",
                className: "custom-class",
                style: {
                  marginTop: "11vh",
                },
              });
            };
            error();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const imagePicker = async (e) => {
    e.preventDefault();
    setProfilePic(e.target.files[0]);
    setChanged(true);
  };

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }

    const localProf = localStorage.getItem("profile");
    if (localProf) {
      setProfile(JSON.parse(localProf));
      setProfilePic(JSON.parse(localProf).profile_pic);
    }

    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push(`/myprofile/edit`);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setLoading(false);
      setPhoneNo(profile.phone_no);
      setAddress(profile.address);
      setBio(profile.bio);
      setUsername(profile.user.user_model);
      setFirstName(profile.user.first_name);
      setLastName(profile.user.last_name);
    }
  }, [profile]);

  if (!context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        {loading === true ? (
          <div className="Center">
            <Spinner color="primary" />
            <div className="text-primary">Loading...</div>
          </div>
        ) : (
          <Container>
            <Content
              className="site-layout-background ls-form"
              style={{
                padding: 24,
                margin: 0,
                marginTop: "3rem",
                minHeight: 280,
              }}
            >
              <Row className="pro-edit-frm">
                <Col md="6" className="offset-md-3 p-2">
                  <Form onSubmit={handelSubmit}>
                    <div className="text-center">
                      <div>
                        <label htmlFor="imagepicker" className="">
                          <img
                            src={profilePic}
                            alt=""
                            className="profile-form"
                          />
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="imagepicker"
                          accept="image/*"
                          multiple={false}
                          onChange={(e) => imagePicker(e)}
                          className="hidden"
                        />
                      </div>
                      {/* )} */}
                    </div>

                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Username
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        className="pl-2 pt-4 pb-4 pro-edit-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        First Name
                      </Label>

                      <Input
                        type="text"
                        name="First Name"
                        id="firstName"
                        placeholder="First name"
                        className="pl-2 pt-4 pb-4 pro-edit-username"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Last Name
                      </Label>

                      <Input
                        type="text"
                        name="Last Name"
                        id="lastName"
                        placeholder="Last name"
                        className="pl-2 pt-4 pb-4 pro-edit-username"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Bio
                      </Label>

                      <Input
                        type="text"
                        name="bio"
                        id="bio"
                        className="pl-2 pt-4 pb-4 pro-edit-bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="bio"
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Phn No.
                      </Label>

                      <Input
                        type="number"
                        name="number"
                        id="phonenumber"
                        className="pl-2 pt-4 pb-4 pro-edit-phno"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="phone number"
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Address{" "}
                      </Label>

                      <Input
                        type="textarea"
                        name="area"
                        id="area"
                        className="pl-2 pb-4 pro-edit-add"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="address"
                        required={true}
                      />
                      <span
                        className="mb-4"
                        style={{ fontSize: "12px", float: "right" }}
                      >
                        *Add detailed address with pin code
                      </span>
                    </FormGroup>

                    <Button
                      type="submit"
                      color="primary"
                      block
                      className="text-uppercase mt-4"
                    >
                      Apply Changes
                      {/* {isUpdate ? "Update Contact" : "Add Contact"} */}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Content>
          </Container>
        )}
      </>
    );
  }
};

export default CreateProfile;
