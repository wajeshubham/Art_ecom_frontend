import React, { useEffect, useContext, useState } from "react";
import dp from "../assets/dp.png";
import Axios from "axios";
import { server } from "../utils/server";
import { useHistory, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  Layout,
  Card,
  Avatar,
  Tag,
  notification,
  Button,
  Rate,
  Form,
  Comment,
  message,
  Tooltip,
  Popconfirm,
} from "antd";
import { Row, Col, Spinner } from "reactstrap";
import "../css/ListingDetails.css";
import { FaPhone, FaTrashAlt, FaTrashRestore } from "react-icons/fa";
import TextArea from "antd/lib/input/TextArea";

function ListingDetails(props) {
  const context = useContext(UserContext);
  const history = useHistory();
  const { Content } = Layout;
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState(null);
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState(null);
  const [reviews, setReviews] = useState(null);

  function cancel(e) {
    message.error("Click on No");
  }

  const handelReviewDelete = async (re_id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers.

      await Axios({
        url: `${server}/listings/${re_id}/review/delete/`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        const newReviews = reviews.filter((i) => i.id !== re_id);
        setReviews(newReviews);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handelCommenting = async (rate) => {
    try {
      let reviewData = new FormData();
      reviewData.append("rating", rate);
      reviewData.append("comment", comment);

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
        url: `${server}/listings/${props.match.params.id}/review/add/`,
        method: "POST",
        data: reviewData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        if (res) {
          history.go(`/listing/${props.match.params.id}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const btn = (
    <Button type="primary" size="small" href="/mycart">
      Go to the cart
    </Button>
  );

  const onFinish = (values) => {
    if (values.rate > 0) {
      handelCommenting(values.rate);
    } else {
      const warning = () => {
        message.warning({
          content: "Please give rating!",
          className: "custom-class",
          style: {
            marginTop: "8vh",
          },
        });
      };
      warning();
    }
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    try {
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
        url: `${server}/users/${props.match.params.id}/add_tocart/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        notification.info({
          message: `${res.data.data}`,
          placement: "bottomRight",
          btn,
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
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
        url: `${server}/listings/${props.match.params.id}/details/`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          setResponse(res.data.data);
          setListUser(res.data.listing_user);
          setReviews(res.data.data.listingreview);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    if (response && listUser) {
      setLoading(false);
    }
  }, [fetchDetails]);

  useEffect(() => {
    const localCreds = localStorage.getItem("user");
    if (localCreds) {
      context.setUser(JSON.parse(localCreds));
    }
    fetchDetails();
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      history.push(`/listing/${props.match.params.id}`);
    }
  }, []);

  if (!context.user?.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        {loading === true ? (
          <div className="Center">
            <Spinner color="primary" />
            <div className="text-primary">Loading...</div>
          </div>
        ) : (
          <Layout
            style={{ padding: "0 24px 24px", margin: "3rem", marginTop: 0 }}
          >
            <div className="det-head-cont">
              <h1 className="det-header">Listing details</h1>
            </div>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Col md={13} style={{ marginBottom: "2rem" }}>
                <Row className="description">
                  <img
                    alt="listing-pic"
                    className="list-det-img"
                    style={{
                      width: "45%",
                      height: "100%",
                      marginBottom: "10px",
                    }}
                    src={response.image}
                  />
                  <Col md={6}>
                    <Row className="title-row">
                      <Card className="title-box">
                        <h4 className="m-0 p-0" style={{ fontSize: "3rem" }}>
                          ₹ {response.price}
                          <span className="float-right">
                            <button
                              className="btn btn-primary text-white border-0"
                              style={{ backgroundColor: "#40a9ff" }}
                              onClick={addToCartHandler}
                            >
                              Add to cart
                            </button>
                          </span>
                        </h4>

                        <p
                          className="mt-1 mb-5 text-secondary"
                          style={{ fontSize: "2rem", fontWeight: "1px" }}
                        >
                          {response.title}
                        </p>

                        <div className=" p-0 m-0" style={{ fontSize: "15px" }}>
                          <span className="float-left">{response.date}</span>
                          <span className="float-right">
                            {response.city}, {response.state}
                          </span>
                        </div>
                      </Card>
                    </Row>
                    <Row className="user-row">
                      <Card className="user-box" title="Listed by">
                        <Row>
                          <Avatar
                            className="mt-1 mr-4"
                            size={50}
                            src={listUser.profile_pic}
                          />

                          <p>
                            <span
                              className="mt-4 mb-0 us-r-usen mr-4"
                              style={{ fontSize: "2rem", fontWeight: 700 }}
                            >
                              {response.user}
                            </span>
                            {listUser.user.isAdmin ? (
                              <Tag color="geekblue">Artist</Tag>
                            ) : null}
                            <br></br>
                            {listUser.phone_no ? (
                              <span className="mt-0 text-secondary ph">
                                {listUser.phone_no}
                              </span>
                            ) : null}
                          </p>
                          <a
                            className="text-center btn btn-primary btn-block"
                            style={{ overflow: "hidden" }}
                            href={`mailto:${listUser.user.email}`}
                          >
                            <span className="us-r-em">
                              {listUser.user.email}
                            </span>
                          </a>
                        </Row>
                      </Card>
                    </Row>

                    <Row className="location-row">
                      <Card className="location-box" title="Listing location">
                        <a
                          className="btn btn-primary btn-block"
                          style={{ overflow: "hidden" }}
                          href={`https://www.google.com/maps/place/${response.city},+${response.state}`}
                        >
                          <span>
                            {response.city}, {response.state} (Go to the
                            location)
                          </span>
                        </a>
                      </Card>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Row className="description-row">
                <Card
                  className="description-box"
                  title="description"
                  style={{
                    width: "100%",
                    padding: "2rem",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  <p>{response.description}</p>
                </Card>
              </Row>
              <Row className="description-row">
                <Card
                  className="description-box mt-5"
                  title="Add review"
                  style={{
                    width: "100%",
                    padding: "2rem",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  <Form
                    name="validate_other"
                    onFinish={onFinish}
                    initialValues={{
                      rate: 0,
                    }}
                  >
                    <Form.Item name="rate" label="Rate" labelCol={{ span: 24 }}>
                      <Rate />
                    </Form.Item>
                    <Form.Item
                      name="comment"
                      label="Write your review"
                      labelCol={{ span: 24 }}
                    >
                      <TextArea
                        rows={4}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Row>
              {reviews.length > 0 && (
                <Row className="description-row">
                  <Card
                    className="description-box mt-5"
                    title={`Reviews (${reviews.length})`}
                    style={{
                      width: "100%",
                      padding: "2rem",
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                  >
                    {reviews &&
                      reviews.map((review, id) => (
                        <Comment
                          key={id}
                          author={review.user}
                          avatar={
                            <Avatar
                              src={`${
                                review.profile.profile_pic
                                  ? review.profile.profile_pic
                                  : dp
                              }`}
                              alt={`${review.user}`}
                            />
                          }
                          content={
                            <React.Fragment>
                              <p>{review.comment}</p>
                              <Rate
                                disabled={true}
                                defaultValue={review.rating}
                              />
                              <Row>
                                {review.user === context.user?.username ? (
                                  <Popconfirm
                                    title="Are you sure you want to delete this review?"
                                    onConfirm={() =>
                                      handelReviewDelete(review.id)
                                    }
                                    onCancel={cancel}
                                    okText="Delete"
                                    cancelText="Cancel"
                                  >
                                    <button className="btn btn-sm btn-outline-danger ml-4 mt-2">
                                      Delete
                                    </button>
                                  </Popconfirm>
                                ) : null}
                              </Row>
                            </React.Fragment>
                          }
                          datetime={<span>{review.date}</span>}
                        />
                      ))}
                  </Card>
                </Row>
              )}
            </Content>
          </Layout>
        )}
      </div>
    );
  }
}

export default ListingDetails;
