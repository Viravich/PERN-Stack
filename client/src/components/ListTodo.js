import React, { Fragment, useState, useEffect } from "react";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-all-todos");
      const jsonData = await response.json();
      setTodos(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((data) => (
            <tr>
              <td>{data.description}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
