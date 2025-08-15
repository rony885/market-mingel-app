import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import { Link, useLocation } from "react-router-dom";
import "@iconify-icon/react";
import { PiCaretLineLeftBold, PiCaretLineRightBold } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { useApiContext } from "../../../context/ApiContext";

const EmigrantDivCategoryList = () => {
  const location = useLocation();

  const {
    emigrantService_category,
    fetchEmigrantSerCategory,
    handleApiPageChange,
    handleApiItemPerPageChange,
    handleApiSearchItemChange,
    resetPagination,
  } = useApiContext();

  useEffect(() => {
    fetchEmigrantSerCategory();
  }, [fetchEmigrantSerCategory]);

  useEffect(() => {
    resetPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const {
    results: arr = [],
    total_pages: totalPages,
    data_per_page: itemsPerPage,
    count,
  } = emigrantService_category;

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

  const [receivedId, setReceivedId] = useState(null);

  // delete
  const getId = (id) => {
    setReceivedId(id);
  };

  const deleteCategory = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService_category/${id}/`
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
                  <Link to="/">Dashboard</Link> | Emigrant Division Category
                  List
                </h4>

                <Link
                  to="/emigrant-service-category-add"
                  className="btn btn-sm btn-primary fs-4"
                >
                  Add Emigrant Division Category
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
                        <th>SL</th>
                        <th>Name</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {count === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No data found
                          </td>
                        </tr>
                      ) : (
                        arr.map((category, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{category.name}</td>

                              <td className="text-end">
                                <div className="d-flex gap-2 justify-content-end">
                                  <Tooltip title="Edit" arrow>
                                    <Link
                                      to={`/emigrant-service-category-edit/${category.id}`}
                                      className="btn btn-soft-primary btn-sm"
                                    >
                                      <iconify-icon
                                        icon="solar:pen-2-broken"
                                        className="align-middle fs-18"
                                      ></iconify-icon>
                                    </Link>
                                  </Tooltip>

                                  <Tooltip title="Delete" arrow>
                                    <button
                                      className="btn btn-soft-danger btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteModal"
                                      type="button"
                                      onClick={() => getId(category.id)}
                                    >
                                      <iconify-icon
                                        icon="solar:trash-bin-minimalistic-2-broken"
                                        className="align-middle fs-18"
                                      ></iconify-icon>
                                    </button>
                                  </Tooltip>
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

              {/* ========== Modal ==========*/}
              <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteModalLabel">
                        Delete Modal
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
                        onClick={() => deleteCategory(receivedId)}
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

export default EmigrantDivCategoryList;
