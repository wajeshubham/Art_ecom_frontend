import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  notification,
  Badge as Bg,
  Popconfirm,
  message,
} from "antd";
import {
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../css/ListingCard.css";
import { CardBody, Tooltip } from "reactstrap";
import Axios from "axios";
import { server } from "../utils/server";
import { Link } from "react-router-dom";

function ListingCard({
  id,
  dis,
  date,
  price,
  title,
  image,
  city,
  state,
  inCart,
  cart,
  setCart,
  activeUser,
  listingUser,
  isInProfile,
  isInCart,
  listings,
  setListings,
  isInStock,
  likedUsersList,
  likesCount,
}) {
  const [liked, setLiked] = useState(false);
  const btn = (
    <Button type="primary" size="small" href="/mycart">
      Go to the cart
    </Button>
  );

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const handleLike = async (e) => {
    e.preventDefault();
    setLiked(!liked);
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
        url: `${server}/listings/${id}/like/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.message === "liked!") {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    } catch (error) {
      console.log(error);
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
        url: `${server}/users/${id}/add_tocart/`,
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

  const deleteListingHandler = async (e, id_) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers
      await Axios({
        url: `${server}/listings/${id_}/delete/`,
        method: "DELETE",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          const newListings = listings.filter((i) => i.id !== id_);
          setListings(newListings);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const deleteHandler = async (e, id_) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      //headers
      await Axios({
        url: `${server}/users/${id_}/remove/`,
        method: "DELETE",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          const newCart = cart.filter((i) => i.id !== id_);
          setCart(newCart);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  useEffect(() => {
    if (!isInCart && !isInProfile) {
      likedUsersList.map((user, i) => {
        if (user === activeUser) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    }
  }, []);

  return (
    <a href={`/listing/${id}`}>
      <Bg.Ribbon
        color={isInStock ? "blue" : "orange"}
        text={isInStock ? "In stock" : "Out of stock"}
      >
        <Card
          className="my-4 ml-4 card-listing mob-card"
          style={{
            width: 300,
            border: "1px solid #ddd",
            margin: 0,
            overflow: "hidden",
          }}
          cover={
            <div style={{ width: "60 %" }}>
              <img
                alt="example"
                className="cover-image"
                style={{
                  width: "100%",
                  height: "15vw",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
                src={image}
              />
              {isInProfile ? (
                <Link to={`/listing/${id}/edit/`}>
                  <Button
                    className="btn btn-primary cart-btn"
                    onClick={() => "foo"}
                    id="edit"
                  >
                    <FaEdit />
                    <Tooltip
                      placement="bottom"
                      isOpen={tooltipOpen}
                      target="edit"
                      toggle={toggle}
                    >
                      Edit listing
                    </Tooltip>
                  </Button>
                </Link>
              ) : null}

              {!inCart && !isInProfile && isInStock ? (
                <>
                  <Button
                    className="btn btn-primary cart-btn"
                    onClick={(e) => handleLike(e)}
                    id="like"
                  >
                    {liked ? (
                      <AiFillHeart height="30px" color="red" />
                    ) : (
                      <AiOutlineHeart height="30px" />
                    )}
                  </Button>
                  <Button
                    className="btn btn-primary cart-btn"
                    onClick={(e) => addToCartHandler(e)}
                    id="AddToCart"
                  >
                    <AiOutlineShoppingCart height="30px" />
                  </Button>
                </>
              ) : !isInProfile && inCart ? (
                <Button
                  className="btn btn-primary cart-btn"
                  onClick={(e) => deleteHandler(e, id)}
                  id="removeFrmCart"
                >
                  <FaTrashAlt />
                  <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="removeFrmCart"
                    toggle={toggle}
                  >
                    Remove from cart
                  </Tooltip>
                </Button>
              ) : null}

              {activeUser === listingUser && !isInCart && isInProfile ? (
                <Popconfirm
                  title="Are you sure you want to delete this listing?"
                  onConfirm={(e) => deleteListingHandler(e, id)}
                  onCancel={cancel}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button className="btn btn-primary cart-btn" id="deleteH">
                    <AiOutlineDelete />
                  </Button>
                </Popconfirm>
              ) : null}
            </div>
          }
        >
          <CardBody className="m-0 mob-card-bd" style={{ paddingBottom: 0 }}>
            <h4 className="m-0 p-0">₹ {price}</h4>

            <p className="mt-1 mb-5">{title}</p>

            <div className=" p-0 m-0" style={{ fontSize: "9px" }}>
              <span className="float-left">{date}</span>
              <span className="float-right">
                {city}, {state}
              </span>
            </div>
          </CardBody>
        </Card>
      </Bg.Ribbon>
    </a>
  );
}

export default ListingCard;
