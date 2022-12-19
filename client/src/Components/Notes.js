import React, { useEffect, useState, useCallback } from "react";

const Notes = () => {
  const API_URI = "/api/v1/notes/createNote";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [notes, setNotes] = useState([]);

  // fetch the user from userProfile route

  const userProfileAPI = "/api/v1/auth/getUser";
  const getMyNotesApi = "/api/v1/notes/getAllNotes";
  // const updateNoteApi = "/api/v1/notes/updateNote";

  const fetchUserProfile = async () => {
    const response = await fetch(userProfileAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });

    return response.json();
    // console.log(json);
  };

  const getMyNotes = useCallback(async () => {
    const response = await fetch(getMyNotesApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const noteSubmitted = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      tag,
    };

    if (tag.length === 0) return setTag("General");
    console.log(data);

    const response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(data),
    });
    return response.json();
    // console.log(json);
  };

  const hideNotes = () => {
    setNotes([]);
  };

  // const updateFormSubmitted = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     updatedTitle,
  //     updatedDescription,
  //     updatedTag,
  //   };
  //   console.log(data);
  // };

  return (
    <>
      <form className="fs-5 container mt-5" onSubmit={noteSubmitted}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            minLength={2}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            minLength={5}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            // required
          />
        </div>
        <button type="submit" className="btn btn-primary rounded fs-5">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-primary rounded fs-5 mx-2"
          onClick={getMyNotes}
        >
          Get All
        </button>
        <button
          type="button"
          className="btn btn-primary rounded fs-5 mx-2"
          onClick={hideNotes}
        >
          Hide All
        </button>
        {/* notes */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {notes.map((item) => {
            return (
              <div
                className="col"
                key={item.description.length + Math.random()}
              >
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-text">{item.description}</p>
                    <i className="form-label">{item.tag}</i>
                    <hr />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={async () => {
                        const response = await fetch(
                          `/api/v1/notes/deleteNote/${item._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              authToken: localStorage.getItem("authToken"),
                            },
                          }
                        );
                        alert("Your Note was Permanently Deleted");
                        window.location.reload();
                        return response.json();
                        // console.log(json);
                        // console.log("deleted note with id: ", item._id);
                      }}
                    >
                      <div className="image ">
                        <img
                          className="bg-danger rounded-circle"
                          src="https://is.gd/5czcKJ"
                          width="50px"
                          alt=""
                        />
                      </div>
                    </button>
                    <button
                      className="btn btn-outline-secondary mx-3 rounded-circle"
                      type="button"
                      onClick={async (event) => {
                        event.preventDefault();
                        setTitle(item.title);
                        setDescription(item.description);
                        setTag(item.tag);
                        // console.log(data);
                        // const response = await fetch(
                        //   `/api/v1/notes/updateNote/${item._id}}`,
                        //   {
                        //     method: "PUT",
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //       authToken: localStorage.getItem("authToken"),
                        //     },
                        //   }
                        // );
                        // const json = await response.json();
                        // console.log(json);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
};

export default Notes;
