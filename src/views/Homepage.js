import React, { Component } from 'react';
import bg from '../images/bg.jpg'
import { uri } from 'react-querystring-router';

const { stringifyParams } = uri;

let backgroundStyle = {
  background: "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(" + bg + ")",
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

class Homepage extends Component {
  constructor(props) {
    super(props);

    let scope = 'user-read-private user-read-email streaming user-modify-playback-state';
    let redirectURI = 'http://data.cs.purdue.edu:7373/callback';
    let loginURL = 'https://accounts.spotify.com/authorize' +
      stringifyParams({
        response_type: 'code',
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: scope,
        redirect_uri: redirectURI,
        state: 'state123'
      });

    this.state = {
      loginURL: loginURL
    };
  }

  render() {
    return (
      <div>
        <div class="welcome d-flex justify-content-center flex-column">
          <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark pt-4 px-0">

              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link" href="#welcome">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                  </li>
                </ul>

                <ul class="header-social-icons navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="https://instagram.com/tobiola__"><i class="fa fa-instagram"></i></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.facebook.com/obitola"><i class="fa fa-facebook"></i></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://linkedin.com/in/tobiola"><i class="fa fa-linkedin"></i></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://github.com/tobiola"><i class="fa fa-github"></i></a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div class="inner-wrapper mt-auto mb-auto container">
            <div class="row mb-5">
              <div class="col-lg-5 col-md-5 col-sm-12 mt-auto mb-auto mr-3">
                <h1 class="welcome-heading display-4 text-white">Paux</h1>
                <p class="text-muted">Make your Spotify queue public to you friends! <br /> Only works on Google Chrome and Firefox.</p>
                <a href={this.state.loginURL} class="btn btn-success btn-pill align-self-center m-1"><i class="fa fa-spotify mr-2"></i>Host A Room</a>
                <a href="#rooms" class="btn btn-primary btn-pill align-self-center m-1"><i class="fa fa-spotify mr-2"></i>Join A Room</a>
                <div class="d-block mt-4">
                </div>
              </div>

              <div class="col-lg-4 col-md-5 col-sm-12 mx-auto">
                <img class="mx-auto" src="img/queue.png" style={{ width: "18em" }} alt="iPhone App Mockup - Shards App Promo Demo" />
              </div>
            </div>
          </div>
        </div>

        <div class="blog section section-invert py-4">
          <h3 class="section-title text-center m-5">Available Rooms</h3>
          <div class="container">
            <div class="py-4">
              <div class="row">
                <div class="col-md-12 col-lg-8 mx-auto">
                  <div class="card mb-4">

                    <div class="card-body">
                      <input type="text" class="form-control" placeholder="Search for a room here" />
                      <table class="table table-striped table-responsive-md">

                        <thead>
                          <tr>
                            <th>Host</th>
                            <th>Room ID</th>
                            <th>Size</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody id="rooms-table">
                          <script id="rooms-template" type="text/x-handlebars-template">
                            <tr class="background-hover">
                              <td class="single-line"><img class="room-img m-0 mr-3" src="" />Tobi</td>
                              <td class="single-line">obitola</td>
                              <td class="single-line">3</td>
                              <td><a class="btn btn-success btn-sm btn-pil" href="/obitola">Join</a></td>
                            </tr>
                          </script>
                          <tr>
                            <td>Tobi Ola</td>
                            <td>mysuperlongid</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="section-title text-center m-5">Contact Us</h3>
        <div class="container py-4">
          <div class="row justify-content-md-center px-4">
            <div class="contact-form col-sm-12 col-md-10 col-lg-7 p-4 mb-4 card">
              <form>
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="contactFormFullName">Full Name</label>
                      <input type="email" class="form-control" id="contactFormFullName" placeholder="Enter your full name" />
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="contactFormEmail">Email address</label>
                      <input type="email" class="form-control" id="contactFormEmail" placeholder="Enter your email address" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Message</label>
                      <textarea id="exampleInputEmail1" class="form-control mb-4" rows="10"
                        placeholder="Enter your message..." name="message"></textarea>
                    </div>
                  </div>
                </div>
                <input class="btn btn-success btn-pill d-flex ml-auto mr-auto" type="submit" value="Send Your Message" />
              </form>
            </div>
          </div>
        </div>

        <footer>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
              <a class="navbar-brand" href="#">Paux</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#welcome">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </footer>
        <div style={backgroundStyle}>
        {/*<div style={darken}></div>*/}
      </div>
      </div>
    )
  }
}

export default Homepage;