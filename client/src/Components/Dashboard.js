import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    const userAPI = "api/v1/auth/getUser";
    const response = await fetch(userAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setName(json.name);
    setEmail(json.email);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder"
                        className="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1 text-white">{name}</h5>
                      <p
                        className="mb-2 pb-1 text-white"
                        style={{ color: "#2b2a2a" }}
                      >
                        {email}
                      </p>
                      <div
                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div>
                          <p className="small text-danger mb-1 ">Articles</p>
                          <p className="mb-0">41</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-danger mb-1">Followers</p>
                          <p className="mb-0">976</p>
                        </div>
                        <div>
                          <p className="small text-danger mb-1">Rating</p>
                          <p className="mb-0">8.5</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
