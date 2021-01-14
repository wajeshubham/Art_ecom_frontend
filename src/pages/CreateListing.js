import React, { useState, useContext, useEffect } from "react";
import { Form, InputNumber, Button, Input, Layout } from "antd";
import {
  StateDropdown,
  RegionDropdown,
} from "react-india-state-region-selector";
import camPic from "../assets/photo-camera.png";
import { Container, Spinner } from "reactstrap";
import { server } from "../utils/server";
import UserContext from "../context/UserContext";
import Axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

//TODO: Set Loading functionality

const CreateListing = () => {
  const context = useContext(UserContext);
  const history = useHistory();
  const { Content } = Layout;
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [image, setImage] = useState("");
  const [response, setResponse] = useState(null);

  const handelListing = async () => {
    try {
      let listingData = new FormData();
      listingData.append("title", response.title);
      listingData.append("description", response.description);
      listingData.append("image", response.image);
      listingData.append("price", response.price);
      listingData.append("state", state);
      listingData.append("city", region);
      listingData.append("quantity", response.quantity);

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
        url: `${server}/listings/add/`,
        method: "POST",
        data: listingData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        console.log("created");
        // console.log(res);
      });
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push("/add-listing");
    }
  }, []);

  const imagePicker = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    setImage(img);
  };

  const onFinish = async (values) => {
    values.image = image;
    setResponse(values);
  };

  useEffect(() => {
    handelListing();
  }, [onFinish]);

  const selectState = (val) => {
    setState(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  if (!context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        {loading === true ? (
          <div className="Center">
            <Spinner color="primary" />
            <div className="text-primary">processing please wait...</div>
          </div>
        ) : (
          <Container>
            <h1 className="create-pst-hder">Post your listing</h1>
            <Content
              className="site-layout-background ls-form"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="price"
                  label="Price"
                  labelCol={{ span: 24 }}
                  rules={[{ type: "number", required: true }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  labelCol={{ span: 24 }}
                  rules={[{ type: "number", required: true }]}
                >
                  <InputNumber />
                </Form.Item>

                <Form.Item
                  name="description"
                  labelCol={{ span: 24 }}
                  label="Description"
                >
                  <Input.TextArea
                    autoSize={false}
                    style={{ height: "125px" }}
                  />
                </Form.Item>
                <div className="mb-4 state-region">
                  <StateDropdown
                    value={state}
                    onChange={(val) => selectState(val)}
                  />
                  <RegionDropdown
                    State={state}
                    value={region}
                    onChange={(val) => selectRegion(val)}
                  />
                </div>
                <div>
                  <label htmlFor="imagepicker" className="">
                    <img
                      src={camPic}
                      alt=""
                      height="75px"
                      width="75px"
                      style={{ border: "2px solid black", padding: "5px" }}
                    />
                    <p>Add photo +</p>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => {
                      imagePicker(e);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button className="mt-1" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Container>
        )}
      </>
    );
  }
};

export default CreateListing;
