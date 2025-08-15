import React, { useEffect } from "react";
import { useApiContext } from "../../context/ApiContext";

const ContactMap = () => {
  // data fetching
  const { unpaginate_setting, fetchUnpaginateSetting } = useApiContext();

  useEffect(() => {
    fetchUnpaginateSetting();
  }, [fetchUnpaginateSetting]);

  return (
    <div className="contact-map">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div
              className="map-inner lh-0"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              <iframe
                title="Paradise DOHS Baridhara Location"
                src={unpaginate_setting && unpaginate_setting.mapurl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
