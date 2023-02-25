import React from "react";
import "../css/app.css";

const MainPage = () => {
  return (
    <div className="main ">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/P7vtNin.png"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/pXs6vHD.png"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/VoAI5uo.png"
              alt="Third slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/ylrn2Pj.png"
              alt="Forth slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="container top-space bottom-space">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="featurette-heading">Discover our company values!</h2>
            <p className="lead">
              Our personal challenge and mission: we take the competitiveness of
              of our customers in the digital world to the next level.
            </p>
          </div>
          <div className="col-md-5">
            <img
              className="img-featurette image-main-border img-fluid mx-auto"
              src="https://i.imgur.com/4Oj1aoh.jpg"
              alt="Generic placeholder image"
              width="500"
              height="600"
            />
          </div>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="row justify-content-center">
          <div className="col-md-5 order-md-2">
            <p className="lead">
              With our advanced document management system, employers can easily
              store and share employee documents such as employment contracts,
              certificates of employment, employment certificates and other
              important documents. Our system also allows documents to be easily
              searched and filtered, enabling the information needed to be found
              quickly. allows you to quickly find the information you need.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              className="img-featurette image-main-border img-fluid mx-auto"
              src="https://i.imgur.com/Ux4KQ5n.jpg"
              alt="Generic placeholder image"
              width="800"
              height="500"
            />
          </div>
        </div>

        <hr className="featurette-divider"></hr>
      </div>
    </div>
  );
};

export default MainPage;
