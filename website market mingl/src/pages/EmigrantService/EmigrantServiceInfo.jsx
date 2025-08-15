import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext.jsx";

const EmigrantServiceInfo = () => {
  // data fetching
  const { unpaginate_emigrantService, fetchUnpaginateEmigrantService } =
    useApiContext();

  const {
    unpaginate_emigrantService_category,
    fetchUnpaginateEmigrantSerCategory,
  } = useApiContext();

  useEffect(() => {
    fetchUnpaginateEmigrantService();
  }, [fetchUnpaginateEmigrantService]);

  useEffect(() => {
    fetchUnpaginateEmigrantSerCategory();
  }, [fetchUnpaginateEmigrantSerCategory]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to page 1 on search
  };

  // Filtering by category and search term
  const filteredData = unpaginate_emigrantService.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Wrapper>
      <section
        className="game-two game-two-alternate"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="container">
          <div
            className="section__header text-center mb-55"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <span className="fw-6 secondary-text text-xl">
              <strong>Our</strong> Visa Details
            </span>
            <h2
              className="title-animation fw-6 mt-25 text-capitalize"
              style={{ fontSize: "30px", lineHeight: "40px" }}
            >
              Whether you're dreaming of working abroad, studying overseas,
              expanding your business, or traveling the world — MarketMingl
              International is your trusted gateway.
            </h2>
          </div>

          <div className="row gutter-24">
            {/* Search sidebar */}
            <div className="col-12 col-xl-4">
              <div className="lottery-sidebar">
                <div className="lottery__result-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="group-pst">
                      <input
                        type="text"
                        placeholder="Search Here..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Category buttons */}
            <div className="col-12 col-xl-8">
              <div
                className="result__tab-btns text-start text-xl-end"
                style={{ whiteSpace: "nowrap", overflowX: "auto" }}
              >
                <ul className="uull row_horizon mb-3" role="tablist">
                  <button
                    className={selectedCategory === "All" ? "active" : ""}
                    onClick={() => {
                      setSelectedCategory("All");
                      setCurrentPage(1); // reset to page 1
                    }}
                  >
                    All
                  </button>
                  {unpaginate_emigrantService_category &&
                    unpaginate_emigrantService_category.map((cat) => (
                      <li key={cat.id}>
                        <button
                          className={
                            selectedCategory === cat.id ? "active" : ""
                          }
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setCurrentPage(1); // reset to page 1
                          }}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Filtered game cards */}
          <div className="row gutter-24 mt-40 filter-wrapper">
            {paginatedData.length > 0 ? (
              paginatedData.map((emigrantServc, index) => (
                <div
                  key={emigrantServc.id}
                  className="col-12 col-md-6 col-xl-4 col-xxl-3 filter-item"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 100}
                >
                  <div className="lt-type__single text-center tilt">
                    <div className="thumb">
                      <img src={emigrantServc.image} alt={emigrantServc.name} />
                    </div>
                    <span className="price">
                      <i className="fa-solid fa-star"></i> 5
                    </span>
                    <div className="content mt-25">
                      <span className="text-uppercase fw-6 secondary-text">
                        {emigrantServc.name}
                      </span>
                      <h6 className="fw-6 mt-8">
                        <Link
                          to={`/emigrant-division-details/${emigrantServc.id}`}
                        >
                          {/* {emigrantServc.category.name} */}
                          {unpaginate_emigrantService_category &&
                            unpaginate_emigrantService_category
                              .filter(
                                (item) =>
                                  item.id === Number(emigrantServc.category)
                              )
                              .map((itemm) => {
                                return itemm.name;
                              })}
                        </Link>
                      </h6>
                    </div>
                    <div className="cta mt-25">
                      <Link
                        to={`/emigrant-division-details/${emigrantServc.id}`}
                        className="btn--primary"
                      >
                        View Details{" "}
                        <i className="ti ti-arrow-narrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <p>No services found for your search.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row">
              <div className="col-12">
                <div
                  className="pagination-wrapper mt-40 text-center"
                  data-aos="fade-up"
                >
                  <ul className="pagination">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <i className="ti ti-chevron-left"></i>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i}>
                        <button
                          className={currentPage === i + 1 ? "active" : ""}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <i className="ti ti-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Decorative images */}
          <div className="chart">
            <img src="/assets/images/chart.png" alt="Chart" />
          </div>
          <div className="rocket">
            <img src="/assets/images/rocket.png" alt="Rocket" />
          </div>
          <div className="left-thumb">
            <img src="/assets/images/left-th.png" alt="Left Thumb" />
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .row_horizon {
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch;
  }

  .uull li {
    margin-bottom: 0px !important;
  }

  .row_horizon::-webkit-scrollbar {
    height: 0px !important;
  }

  .pagination button.active {
    background-color: #9cecfe;
    color: #000;
  }

  .row_horizon::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

export default EmigrantServiceInfo;
