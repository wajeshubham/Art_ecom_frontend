import { BackTop, Divider } from "antd";
import React, { useState } from "react";
import "../css/Landing.css";
import lpphoto from "../assets/priyanka-sketch.jpg";
import lpphoto2 from "../assets/akshay-sketch.jpg";
import lpphoto3 from "../assets/mostlysane-sketch.jpg";
import lpphoto4 from "../assets/ranveer-sketch---22.jpg";
import lpphoto5 from "../assets/rd-burman-sketch.jpg";
import lpphoto6 from "../assets/salman-sketch.jpg";
import lpphoto7 from "../assets/taapsee-sketch.jpg";
import lpphoto8 from "../assets/sonakshi-sketch----33.jpg";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaMailBulk,
} from "react-icons/fa";

import { Carousel } from "antd";
import { Link } from "@material-ui/core";

const contentStyle = {
  height: "100%",
  width: "35%",
  backgroundColor: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
  marginLeft: "32%",
  marginTop: "1rem",
  paddingBottom: "1rem",
};
const LandingPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const contactUs = () => {
    return (
      <section className="text-gray-700 body-font relative" id="cont">
        <div className="container pt-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              <Divider>Contact Us</Divider>
            </h1>
            <p
              className="lg:w-2/3 mx-auto leading-relaxed text-base"
              // style={{ fontSize: 15, color: "black", fontWeight: 600 }}
            >
              Contact us through email or phone number given below or feel free
              to ask any query you have.
            </p>
          </div>
          <div
            className="lg:w-1/2 md:w-2/3 mx-auto bg-white p-4"
            style={{ borderRadius: "10px" }}
          >
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      console.log(email);
                    }}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone no.
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      console.log(phone);
                    }}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  style={{ backgroundColor: "#1890ff" }}
                  className="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Send
                </button>
              </div>
              <div className="w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <p style={{ color: "#40a9ff" }}>
                  <span style={{ color: "black" }}>Mail:</span>{" "}
                  waje.shubham111@gmail.com
                </p>
                <p style={{ color: "#40a9ff" }}>
                  <span style={{ color: "black" }}>Phn. no.:</span> (+91)
                  9284184865
                </p>

                <p className="leading-normal mt-2">
                  Mumbai - 401209
                  <br />
                  Maharashtra, India
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <section
        className="text-gray-700 body-font"
        // style={{ backgroundColor: "white" }}
      >
        <Carousel
          className="mob-img-cont"
          autoplay
          effect="fade"
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto2}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto3}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto4}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto5}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto6}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto7}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              className="mob-img-landing"
              style={contentStyle}
              alt="hero"
              src={lpphoto8}
            />
          </div>
        </Carousel>
        <Divider>***</Divider>

        <div className="mx-auto flex pt-10 pb-6 items-center justify-center flex-col">
          {/* <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded"
            alt="hero"
            src={lpphoto}
          /> */}
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Gift your loved one a beautiful sketch
            </h1>
            <p className="mb-8 leading-relaxed">
              Graphite pencil A4 sketches are available at very reasonable
              prices. Framed sketches are available (only within Mumbai).{" "}
              <span style={{ fontWeight: "bolder" }}>
                Free shipping all over india.
              </span>
            </p>
            <div className="flex justify-center">
              <a href="/">
                <button
                  id="price"
                  style={{ backgroundColor: "#1890ff" }}
                  className="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Buy the artworks
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* pricing */}
      <div>
        <section
          className="text-gray-700 body-font"
          style={{ fontSize: 15, color: "black", fontWeight: 600 }}
        >
          <div
            className="mx-auto px-2"
            style={{ fontSize: 15, color: "black", fontWeight: 600 }}
          >
            <div className="flex flex-col text-center w-full">
              <h1
                className="sm:text-4xl text-3xl font-medium title-fonttext-gray-900"
                style={{ fontSize: 35 }}
              >
                <Divider>Pricing</Divider>
              </h1>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <table className="table table-auto w-full text-left whitespace-no-wrap">
                <thead className="thead-dark">
                  <tr>
                    <th
                      className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl"
                      style={{ fontSize: 15, color: "white", fontWeight: 600 }}
                    >
                      Size
                    </th>
                    <th
                      className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200"
                      style={{ fontSize: 15, color: "white", fontWeight: 600 }}
                    >
                      Type
                    </th>
                    <th
                      className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200"
                      style={{ fontSize: 15, color: "white", fontWeight: 600 }}
                    >
                      Price (Rs.)
                    </th>
                    <th
                      className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200"
                      style={{ fontSize: 15, color: "white", fontWeight: 600 }}
                    >
                      Discounted Price
                    </th>
                    <th
                      className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tr rounded-br"
                      style={{ fontSize: 15, color: "white", fontWeight: 600 }}
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">A4</td>
                    <td className="px-4 py-3">Graphite</td>
                    <td className="px-4 py-3">1299</td>
                    <td className="px-4 py-3 text-lg text-gray-900">-</td>
                    <td className="w-10 text-center">
                      <button
                        className="btn text-white"
                        style={{ backgroundColor: "#1890ff" }}
                      >
                        Place an order
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">A3</td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Graphite
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      1599
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      -
                    </td>
                    <td className="border-t-2 border-gray-200 w-10 text-center">
                      <button className="btn btn-secondary" disabled={true}>
                        unavailable
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      2 x A4
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Graphite
                    </td>
                    <td
                      className="border-t-2 border-gray-200 px-4 py-3"
                      style={{ textDecoration: "line-through", color: "#555" }}
                    >
                      2600
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      2099
                    </td>
                    <td className="border-t-2 text-white border-gray-200 w-10 text-center">
                      <button
                        className="btn text-white"
                        style={{ backgroundColor: "#1890ff" }}
                      >
                        Place an order
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      2 x A3
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Graphite
                    </td>
                    <td
                      className="border-t-2 border-b-2 border-gray-200 px-4 py-3"
                      style={{ textDecoration: "line-through", color: "#555" }}
                    >
                      3200
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                      2499
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                      <button className="btn btn-secondary" disabled={true}>
                        unavailable
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
              <span className="text-secondary text-sm">
                Total price will decrease depending on number of sketches
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* contact us */}
      {contactUs()}
      {/* footer */}
      <footer className="text-gray-700 body-font mt-5">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">SketchIt</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2020 SketchIt —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @wajeshubham
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="ml-3 text-gray-500">
              <FaLinkedin size="2em" />
            </a>
            <a className="ml-3 text-gray-500">
              <FaInstagram size="2em" />
            </a>
          </span>
        </div>
      </footer>
      <>
        <BackTop />
      </>
      ,
    </>
  );
};

export default LandingPage;
