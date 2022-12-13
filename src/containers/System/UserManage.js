// import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
// import { connect } from "react-redux";
import "./UserManage.scss";
import { deleteUser, getAllUsers } from "../../services/userService";
import { useEffect, useState } from "react";
import ModalUser from "./ModalUser";

const UserManage = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // fetchAllUsers();
  }, []);

  // const fetchAllUsers = async () => {
  //   let res = await getAllUsers();
  //   if (res && res.errCode === 0) {
  //     setListUsers(res.user);
  //   }
  // };

  const handAddNewUser = () => {
    console.log("abc");
  };

  const handleDelete = async (user) => {
    try {
      let res = await deleteUser(user);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-container">
      {/* <ModalUser /> */}
      <div className="title text-center">Manage users with NTK </div>
      <div className="mx-1">
        <button className="btn btn-primary" onClick={handAddNewUser}>
          Add new Users
        </button>
      </div>
      <div className="users-table mt-4 mx-1">
        <table id="customers">
          <tbody>
            <tr>
              <th>email</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>address</th>
              <th>Actions</th>
            </tr>
            {listUsers && listUsers.length > 0 ? (
              listUsers.map((item, idx) => {
                return (
                  <tr key={`user-${idx}`}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button>Edit</button>
                      <button onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>not found</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;

// class UserManage extends Component {

//     state = {

//     }

//     componentDidMount() {

//     }

//     render() {
//         return (
//             <div className="text-center">Manage users</div>
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default UserManage;
