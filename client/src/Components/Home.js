import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate("");
  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://is.gd/OUpovC"
              className="d-block mx-lg-auto img-fluid rounded"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">{props.title}</h1>
            <p className="lead">{props.description}</p>
            {!localStorage.getItem("authToken") ? (
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  onClick={() => {
                    navigate("/signUp");
                  }}
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate("/signIn");
                  }}
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  Sign In
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Home.defaultProps = {
  title: "iNotebook - Save your notes on cloud ⛅",
  description:
    "An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee. For more info you can checkout our About Page",
};

export default Home;
