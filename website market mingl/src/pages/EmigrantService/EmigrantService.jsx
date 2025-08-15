import React from "react";
import EmigrantServiceBanner from "./EmigrantServiceBanner";
import EmigrantServiceUs from "./EmigrantServiceUs";
import EmigrantServiceUsOthers from "./EmigrantServiceUsOthers";
import EmigrantServiceInfo from "./EmigrantServiceInfo";
import EmigrantServiceTeam from "./EmigrantServiceTeam";

const EmigrantService = () => {
  return (
    <>
      <EmigrantServiceBanner />
      <EmigrantServiceTeam />
      <EmigrantServiceInfo />
      <EmigrantServiceUs />
      <EmigrantServiceUsOthers />
    </>
  );
};

export default EmigrantService;
