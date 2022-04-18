import React, { Fragment, useState } from "react";

const EditTodo = ({ data }) => {
  const [description, setDescription] = useState(data.description);

  //update todo
  const updateDescription = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/update-todo/${data.todo_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${data.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${data.todo_id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(data.description)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(data.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={(event) => {
                  updateDescription(event);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditTodo;
