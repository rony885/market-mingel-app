import React, { useEffect } from "react";
import styled from "styled-components";
import { useApiContext } from "../../context/ApiContext";

const GlobalAssociateInfo = () => {
  // data fetching
  const { unpaginate_client, fetchUnpaginateClient } = useApiContext();

  useEffect(() => {
    fetchUnpaginateClient();
  }, [fetchUnpaginateClient]);

  return (
    <Wrapper>
      <section
        className="lottery__section"
        style={{
          backgroundImage: `url("/assets/images/lottery/lottery-bg.png")`,
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <div className="section__header text-center mb-60">
                <h3 className="title-animation text-capitalize fw-7">
                  Global Associate
                </h3>
              </div>
            </div>
          </div>

          <div className="row">
            {unpaginate_client &&
              unpaginate_client.map((lotto) => (
                <div key={lotto.id} className="col-6 col-md-4 col-lg-3 mb-4">
                  <div className="lottery__type lt-type-two text-center d-flex flex-column align-items-center justify-content-center h-100">
                    <div className="thumb mb-3 w-100">
                      <img
                        src={lotto.image}
                        alt={`Associate ${lotto.id}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media screen and (max-width: 375px) {
    .lottery__section .row > div {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;

export default GlobalAssociateInfo;
