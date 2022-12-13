import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync, fetchAllUsersAsync } from "../../../store/actions";
import "../UserManage.scss";
import { useState } from "react";
import Swal from "sweetalert2";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

const TableUserManage = ({ handlEditUserFromParent }) => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.admin.users);
  const [arrListUsers, setArrListUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    setArrListUsers(listUsers);
  }, [listUsers]);

  const handleDeleteUser = (item) => {
    Swal.fire({
      title: "Bạn có muốn xóa",
      //   showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      //   denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteUserAsync(item));
      }
    });
  };

  const handleEditUser = (user) => {
    handlEditUserFromParent(user);
  };

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }

  return (
    <>
      <div className="users-container container mb-3">
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrListUsers &&
                arrListUsers.length > 0 &&
                arrListUsers.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn btn-primary mx-3"
                          onClick={() => handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default TableUserManage;
