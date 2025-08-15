import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "@iconify-icon/react";
import { PiCaretLineLeftBold, PiCaretLineRightBold } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useApiContext } from "../../context/ApiContext";
import axios from "axios";

const UserList = () => {
  const location = useLocation();

  const {
    all_users,
    fetchAllUsers,
    handleApiPageChange,
    handleApiItemPerPageChange,
    handleApiSearchItemChange,
    resetPagination,
  } = useApiContext();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    resetPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const {
    results: arr = [],
    total_pages: totalPages,
    data_per_page: itemsPerPage,
    count,
  } = all_users;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handleApiPageChange(pageNumber); // Notify the context or parent component
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    handleApiItemPerPageChange(newItemsPerPage); // Notify the parent to update the number of items per page
  };

  // Handle items per page change
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    handleApiSearchItemChange(newSearch); // Notify the parent to update the number of items per page
  };

  // delete
  const [receivedId, setReceivedId] = useState(null);
  const getId = (id) => {
    setReceivedId(id);
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/${id}/`
    );
    window.location.reload(false);
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                <h4 className="card-title flex-grow-1 fs-4">
                  <Link to="/">Dashboard</Link> | User List
                </h4>

                <Link to="/user-add" className="btn btn-sm btn-primary fs-4">
                  Add User
                </Link>
              </div>

              <div>
                <div className="table-responsive px-2">
                  <input
                    type="search"
                    className="form-control mb-1"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  <table className="table align-middle mb-0 table-hover table-centered">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {count === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No data found
                          </td>
                        </tr>
                      ) : (
                        arr.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      src={`${
                                        item.image
                                          ? item.image
                                          : "/assets/images/user.jpg"
                                      }`}
                                      alt=""
                                      className="avatar-md"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>{item.f_name}</td>
                              <td>{item.l_name}</td>
                              <td>{item.email}</td>
                              <td className="text-capitalize">{item.role}</td>
                              <td>{item.phone}</td>
                              <td>{item.eemmaaiill}</td>

                              <td className="text-end">
                                <div className="d-flex gap-2 justify-content-end">
                                  <Link
                                    to={`/user-edit/${item.id}`}
                                    className="btn btn-soft-primary btn-sm"
                                  >
                                    <iconify-icon
                                      icon="solar:pen-2-broken"
                                      className="align-middle fs-18"
                                    ></iconify-icon>
                                  </Link>

                                  {item.id !== 1 && (
                                    <Link
                                      to="#!"
                                      className="btn btn-soft-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#UserDeleteModal"
                                      type="button"
                                      onClick={() => getId(item.id)}
                                    >
                                      <iconify-icon
                                        icon="solar:trash-bin-minimalistic-2-broken"
                                        className="align-middle fs-18"
                                      ></iconify-icon>
                                    </Link>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card-footer border-top">
                <div className="pagination d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="pagination_text">Rows per page :</span>
                    <div className="ms-2">
                      <select
                        aria-label="Rows per page :"
                        className="form-select fs-6"
                        style={{ width: "80px" }}
                        defaultValue={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <option defaultValue="10">10</option>
                        <option defaultValue="20">20</option>
                        <option defaultValue="30">30</option>
                        <option defaultValue="50">50</option>
                      </select>
                    </div>
                  </div>
                  <span className="pagination-info">
                    {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, count)}{" "}
                    of&nbsp;
                    {count} (Total Page{totalPages > 1 && "s"} : {totalPages})
                  </span>
                  <div className="pagination-buttons d-flex gap-1">
                    <button
                      type="button"
                      aria-label="First Page"
                      className="btn btn-link page-link"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    >
                      <PiCaretLineLeftBold />
                    </button>
                    <button
                      type="button"
                      aria-label="Previous Page"
                      className="btn btn-link page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Page"
                      className="btn btn-link page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </button>
                    <button
                      type="button"
                      aria-label="Last Page"
                      className="btn btn-link page-link"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      <PiCaretLineRightBold />
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="UserDeleteModal"
                tabIndex="-1"
                aria-labelledby="UserDeleteModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="UserDeleteModalLabel">
                        Delete User
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center">
                      <iconify-icon
                        icon="solar:trash-bin-minimalistic-bold-duotone"
                        className="fs-1 text-danger mb-3"
                      ></iconify-icon>
                      <p className="mb-0">
                        Are you sure you want to delete this item?
                      </p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteUser(receivedId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserList;
