import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "@iconify-icon/react";
import { PiCaretLineLeftBold, PiCaretLineRightBold } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../../components/Footer";

import axios from "axios";
import { useApiContext } from "../../context/ApiContext";

const BusinessProposal = () => {
  const location = useLocation();
  const [item, setItem] = useState({});

  const {
    businessProposal,
    fetchBusinessProposal,
    handleApiPageChange,
    handleApiItemPerPageChange,
    handleApiSearchItemChange,
    resetPagination,
  } = useApiContext();

  useEffect(() => {
    fetchBusinessProposal();
  }, [fetchBusinessProposal]);

  useEffect(() => {
    resetPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const {
    results: arr = [],
    total_pages: totalPages,
    data_per_page: itemsPerPage,
    count,
  } = businessProposal;

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

  const getContact = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/businessProposal_api/unpaginate_businessProposal/${id}/`
    );
    setItem(data);
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3">
                <h4 className="card-title flex-grow-1 fs-4">
                  <Link to="/">Dashboard</Link> | Business Proposal List
                </h4>
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Messsage</th>
                        {/* <th>Attachment</th> */}
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {count === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No data found
                          </td>
                        </tr>
                      ) : (
                        arr.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item && item.subject.slice(0, 20)}</td>
                              <td>{item.phone}</td>
                              <td>{item && item.message.slice(0, 20)}</td>
                              {/* <td>{item && item.attachment}</td> */}

                              <td className="text-end">
                                <div className="d-flex gap-2 justify-content-end">
                                  <Link
                                    to="#!"
                                    className="btn btn-light btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ContactViewModal"
                                    type="button"
                                    onClick={() => getContact(item.id)}
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    ></iconify-icon>
                                  </Link>
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

              {/* ======== Modal ======== */}
              <div
                className="modal fade"
                id="ContactViewModal"
                tabIndex="-1"
                aria-labelledby="ContactViewModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ContactViewModalLabel">
                        Business Proposal View
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div
                      className="modal-body d-flex flex-column justify-content-center align-items-center text-center"
                      style={{
                        padding: "2rem",
                        borderRadius: "8px",
                        maxWidth: "600px",
                        margin: "0 auto",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "3rem",
                          marginBottom: "1rem",
                        }}
                      >
                        📬
                      </div>

                      <div
                        className="text-start w-100"
                        style={{
                          maxWidth: "500px",
                          fontSize: "1rem",
                        }}
                      >
                        <p>
                          <strong>Name:</strong> {item && item.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {item && item.email}
                        </p>
                        <p>
                          <strong>Subject:</strong> {item && item.subject}
                        </p>
                        <p>
                          <strong>Phone:</strong> {item && item.phone}
                        </p>
                        <p>
                          <strong>Message:</strong> {item && item.message}
                        </p>
                      </div>

                      <p
                        className="text-muted small mt-3"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Please check your inbox or admin panel for the full
                        message details.
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

export default BusinessProposal;
