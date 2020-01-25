import React, { Component } from 'react';
import { MdCast, MdFullscreen, MdPalette, MdSettings, MdSearch } from 'react-icons/md';
import { FaPlay, FaBackward, FaForward, FaPause } from 'react-icons/fa';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


let imageUrl = "https://i.scdn.co/image/8480fa22ad7eb3e83478effba242df20447ba112";//"https://i.scdn.co/image/cc4fd4d092849a8a9eb51ac159ec0951e65e27e7"; 

let backgroundStyle = {
  background: "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(" + imageUrl + ")",
  backgrounColor: "rgba(0, 0, 0, 0.5)",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  position: "absolute",
  filter: "blur(1.2em)",
  WebkitFilter: "blur(1.2em)",
  transform: "scale(1.2)",
  zIndex: "-1",
  transition: "background ease 2s",
};

/*
let darken = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundPosition: "center top",
  background: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  zIndex: 1,
  height: "auto",
};
*/

let containerStyle = {
  textAlign: "center",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

let albumImage = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  //  height: "25em",
  width: "100%",
  //  marginTop: "10em",
};

let progressBar = {
  position: "relative",
  height: "0.7em",
  width: "100%",
  borderRadius: "3em",
  backgroundColor: "gray",
};

let filler = {
  background: "white",
  height: "100%",
  width: "60%",
  borderRadius: "inherit",
  transition: "width .2s ease-in",
};

let left = {
  float: "left",
};

let right = {
  float: "right",
};

let grey = {
  color: "lightgrey",
};

let settingsDiv = {
  //  margin: "10px",
  backgroundColor: "#FFFFFF20",
  borderRadius: "25px",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

class Host extends Component {
  render() {
    return (
      <Container fluid={true} style={containerStyle}>
      <Navbar fixed="top" bg="clear" variant="dark">
        <Nav className="mx-auto mt-3">
          <div style={settingsDiv} className="p-2">
            <MdFullscreen size="1.8em" />
            <MdSearch size="1.6rem" className="mx-1" />
            <MdSettings size="1.6rem" />
          </div>
        </Nav>
      </Navbar>
      <Row className="w-100">
        <Col lg={4} md={6} sm={8} className="mx-auto">
          <img className="my-3" style={albumImage} src={imageUrl} alt="logo" />
          <h3>Even So Come</h3>
          <h5 className="mb-3" style={grey}>Passion, Kristian Stanfill</h5>

          <FaBackward size="1.6em" className="mb-1" />
          <FaPlay size="1.6em" className="mx-4 mb-1" />
          <FaForward size="1.6em" className="mb-1" />

          <h5 style={left}>3:32</h5>
          <h5 style={right}>5:53</h5>

          <div className="my-2" style={progressBar}>
            <div style={filler}></div>
          </div>
        </Col>
      </Row>

      <div style={backgroundStyle}>
        {/*<div style={darken}></div>*/}
      </div>
    </Container>
    )
  }
};

export default Host;