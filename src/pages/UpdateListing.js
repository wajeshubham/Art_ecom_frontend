import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { Layout, Input as In } from "antd";
import UserContext from "../context/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import Axios from "axios";
import { server } from "../utils/server";

const UpdateListing = ({ match }) => {
  const { Content } = Layout;
  const context = useContext(UserContext);
  const history = useHistory();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      let listingData = new FormData();
      listingData.append("title", title);
      listingData.append("description", description);
      listingData.append("price", price);
      listingData.append("quantity", quantity.toString());

      if (changed === true) {
        listingData.append("image", image);
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
        url: `${server}/listings/${match.params.id}/update/`,
        method: "POST",
        data: listingData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        if (res.data) {
          history.push("/myprofile");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers
      await Axios({
        url: `${server}/listings/${match.params.id}/details/`,
        method: "GET",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setPrice(res.data.data.price);
          setImage(res.data.data.image);
          setQuantity(res.data.data.quantity);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const imagePicker = async (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setChanged(true);
  };

  useEffect(() => {
    if (title && description && price) {
      setLoading(false);
    }
  }, [fetchDetails]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();
    history.push(`/listing/${match.params.id}/edit/`);
  }, []);

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
                          <img src={image} alt="" className="profile-form" />
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
                    </div>

                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Title
                      </Label>
                      <In
                        type="text"
                        name="title"
                        id="title"
                        placeholder="title"
                        className="pl-2 pro-edit-username"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Description
                      </Label>

                      <In.TextArea
                        type="text"
                        name="description"
                        id="description"
                        placeholder="description"
                        className="pl-2 pro-edit-username"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                        setDescription
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Price
                      </Label>
                      <In
                        name="price"
                        type="number"
                        id="price"
                        placeholder="price"
                        className="pl-2 mt-0 pro-edit-username"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="m-0" style={{ fontSize: "13px" }}>
                        Quantity
                      </Label>
                      <In
                        name="quantity"
                        type="number"
                        id="quantity"
                        placeholder="quantity"
                        className="pl-2 mt-0 pro-edit-username"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required={true}
                      />
                    </FormGroup>

                    <Button
                      type="submit"
                      color="primary"
                      block
                      className="text-uppercase"
                    >
                      Apply Changes
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

export default UpdateListing;
