import React from "react";

const Contact = () => {
  return (
    <>
      <div className="feature col container mt-5">
        <div className="bg-dark feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          <img
            src="https://is.gd/aGN2DK"
            className="rounded-circle bi"
            width="50px"
            height="50px"
            alt="people"
          />
        </div>
        <h3 className="fs-2">Vikas Mesrham</h3>
        <p>
          Self motivated and hardworking fresher seeking for an opportunity to
          work challenging environment to prove my skills and utilize my
          knowledge and intelligence
        </p>
        <p>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/vikas-meshram-639099221/"
            className="btn btn-primary my-2"
          >
            Linkedin
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/VikasMeshram2708"
            className="btn btn-secondary my-2 mx-2"
          >
            Github
          </a>
        </p>
      </div>
    </>
  );
};

export default Contact;
