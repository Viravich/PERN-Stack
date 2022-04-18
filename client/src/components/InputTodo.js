import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitData = async (data) => {
    data.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/create-todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN Stack Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitData}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
