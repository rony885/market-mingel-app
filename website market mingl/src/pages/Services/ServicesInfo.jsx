import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const ServicesInfo = () => {
  // data fetching
  const { unpaginate_service, fetchUnpaginateService } = useApiContext();
  const { unpaginate_category, fetchUnpaginateCategory } = useApiContext();

  useEffect(() => {
    fetchUnpaginateService();
  }, [fetchUnpaginateService]);

  useEffect(() => {
    fetchUnpaginateCategory();
  }, [fetchUnpaginateCategory]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // const categories = [
  //   { id: "all", name: "All" },
  //   { id: "major", name: "Major Services" },
  //   { id: "investment", name: "Investment Related" },
  //   { id: "affiliation", name: "Affiliation" },
  //   { id: "facilities", name: "Facilities" },
  // ];

  // const services = [
  //   {
  //     id: 1,
  //     category: "major",
  //     name: "Indenting and Sourcing",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 2,
  //     category: "major",
  //     name: "Manpower Solution",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 3,
  //     category: "major",
  //     name: "Emigrant Service",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 4,
  //     category: "major",
  //     name: "Procurement Management",
  //     image: "/assets/images/services/13.png",
  //   },

  //   {
  //     id: 5,
  //     category: "investment",
  //     name: "International Trading",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 6,
  //     category: "investment",
  //     name: "Foreign Direct Investment",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 7,
  //     category: "investment",
  //     name: "Asset Investment",
  //     image: "/assets/images/services/13.png",
  //   },

  //   {
  //     id: 8,
  //     category: "affiliation",
  //     name: "Government Affiliation",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 9,
  //     category: "affiliation",
  //     name: "Project Management",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 10,
  //     category: "affiliation",
  //     name: "International Tender Participation",
  //     image: "/assets/images/services/13.png",
  //   },

  //   {
  //     id: 11,
  //     category: "facilities",
  //     name: "Market Research",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 12,
  //     category: "facilities",
  //     name: "Green Recycling",
  //     image: "/assets/images/services/13.png",
  //   },
  //   {
  //     id: 13,
  //     category: "facilities",
  //     name: "Community Facilities",
  //     image: "/assets/images/services/13.png",
  //   },
  // ];

  const filteredServices =
    selectedCategory === "All"
      ? unpaginate_service
      : unpaginate_service.filter(
          (service) => service.category === selectedCategory
        );

  return (
    <Wrapper>
      <section
        className="lottery-details lottery-alternate lottery"
        style={{
          backgroundImage: "url('/assets/images/lottery-bg.png')",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="col-12 col-lg-6 col-xl-6 mb-35">
            <div
              className="about__content"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              <div className="section__content text-start">
                <span className="fw-6 secondary-text text-xl">
                  <strong>Every</strong> step of the way
                </span>
                <h2 className="title-animation fw-6 mt-25 text-capitalize">
                  Always ready to make your dream better
                </h2>
              </div>
            </div>
          </div>

          <div className="row gutter-40">
            <div className="col-12">
              <div
                className="lottery-card"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <div className="lt-alternate-card mb-35">
                  <div
                    className="lottery-intro__action uull row_horizon"
                    role="tablist"
                  >
                    <button
                      className={`btn quick-pick ${
                        selectedCategory === "All" ? "custom-active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory("All");
                      }}
                    >
                      All
                    </button>
                    {unpaginate_category &&
                      unpaginate_category.map((cat) => (
                        <button
                          key={cat.id}
                          className={`btn quick-pick ${
                            selectedCategory === cat.id ? "custom-active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCategory(cat.id);
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Services list */}
                <div className="row gutter-24">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="col-12 col-md-6 col-xl-4 col-xxl-3"
                      data-aos="fade-up"
                      data-aos-duration="600"
                    >
                      <div
                        className="lt-type__single text-center tilt"
                        style={{
                          height: "280px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "20px",
                        }}
                      >
                        <div className="thumb">
                          <img
                            src={service.image}
                            alt={service.name}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div className="content mt-20">
                          <h6 className="fw-6">{service.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredServices.length === 0 && (
                    <div className="col-12 text-center">
                      <p>No services found for this category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .custom-active {
    background-color: #9cecfe !important;
    color: #000 !important;
  }

  .row_horizon {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding-bottom: 10px;
    flex-wrap: nowrap;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }

  /* WebKit (Chrome, Safari) */
  .row_horizon::-webkit-scrollbar {
    height: 6px !important;
  }

  .row_horizon::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .row_horizon::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  .row_horizon::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .quick-pick {
    white-space: nowrap;
    min-width: 160px;
    flex-shrink: 0;
  }
`;

export default ServicesInfo;
