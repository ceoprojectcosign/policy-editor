import React from "react";
import AffiliateTracker from "./AffiliateTracker";

const withAffiliateTracking = (Component) => {
  return function Wrapped(props) {
    return (
      <>
        <AffiliateTracker />
        <Component {...props} />
      </>
    );
  };
};

export default withAffiliateTracking;
