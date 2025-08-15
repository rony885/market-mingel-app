import React, { useEffect } from "react";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const EmigrantServiceTeam = () => {
  // data fetching
  const {
    unpaginate_emigrantService_content,
    fetchUnpaginateEmigrantServiceContent,
  } = useApiContext();

  useEffect(() => {
    fetchUnpaginateEmigrantServiceContent();
  }, [fetchUnpaginateEmigrantServiceContent]);

  return (
    <Wrapper>
      <section
        className="game"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-9">
              <div
                className="section__header text-center mb-55"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                <span className="fw-6 secondary-text text-xl">
                  <strong>Meet</strong> Our International Visa Experts
                </span>
                <h2
                  className="title-animation fw-6 mt-25 text-capitalize"
                  style={{ fontSize: "40px", lineHeight: "45px" }}
                >
                  {unpaginate_emigrantService_content &&
                    unpaginate_emigrantService_content.visa_expert_title}
                </h2>
              </div>
            </div>
          </div>

          {/* Two Card Layout */}
          <div className="row justify-content-center">
            <div className="team-card-wrapper d-flex flex-wrap justify-content-center gap-4">
              <div className="card-box text-center">
                <div className="thumb">
                  <img
                    src={
                      unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_image_1
                    }
                    alt={
                      unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_name_1
                    }
                    className="card-image"
                  />
                </div>
                <div className="content mt-3">
                  <h5 className="fw-6 mb-2">
                    {unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_name_1}
                  </h5>
                  <h6 className="fw-5 mb-1">
                    {unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_post_1}
                  </h6>
                </div>
              </div>

              <div className="card-box text-center">
                <div className="thumb">
                  <img
                    src={
                      unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_image_2
                    }
                    alt={
                      unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_name_2
                    }
                    className="card-image"
                  />
                </div>
                <div className="content mt-3">
                  <h5 className="fw-6 mb-2">
                    {unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_name_2}
                  </h5>
                  <h6 className="fw-5 mb-1">
                    {unpaginate_emigrantService_content &&
                      unpaginate_emigrantService_content.visa_expert_post_2}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Images */}
        <div className="chart">
          <img src="/assets/images/vr.png" alt="Imagee" />
        </div>

        <div className="rocket">
          <img src="/assets/images/rocket.png" alt="Imagee" />
        </div>
      </section>
    </Wrapper>
  );
};

// const Wrapper = styled.section`
//   .team-card-wrapper {
//     max-width: 1000px;
//     margin: 0 auto;
//   }

//   .card-box {
//     width: 100%;
//     max-width: 400px;
//     background-color: var(--tertiary-color);
//     border: 1px solid var(--septenary-color);
//     border-radius: 12px;
//     padding: 24px 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//   }

//   .card-image {
//     height: 350px;
//     width: 100%;
//     object-fit: cover;
//     border-radius: 12px;
//   }

//   @media (max-width: 768px) {
//     .card-box {
//       max-width: 100%;
//     }
//   }
// `;

const Wrapper = styled.section`
  .team-card-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  .card-box {
    width: 100%;
    max-width: 400px;
    /* height: 500px; */
    background-color: var(--tertiary-color);
    border: 1px solid var(--septenary-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .thumb {
    height: 300px; /* ✅ Fixed image height */
    border-radius: 12px;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .content {
    margin-top: auto; /* ✅ Push content to bottom */
    text-align: center;
  }

  .content h5 {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .content h6 {
    font-size: 16px;
    color: #fff;
  }

  @media (max-width: 768px) {
    /* .card-box {
      max-width: 100%;
    } */
  }
`;

export default EmigrantServiceTeam;
