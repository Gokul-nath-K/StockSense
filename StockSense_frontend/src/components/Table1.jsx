import axios from "axios";
import React, { Component } from "react";

class Table1 extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:8083/api/v1/products/get")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(`ERROR : ${err.message}`);
      });
  }

  render() {
    return (
      <table border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table1;
