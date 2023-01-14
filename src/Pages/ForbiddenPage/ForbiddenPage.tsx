import React from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { connect } from "react-redux";
import "../css/app.css";

const ForbiddenPage = () => {
  const { RiveComponent } = useRive({
    src: "https://public.rive.app/community/runtime-files/784-1526-error-dance.riv",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });
  return (
    <>
      <div className="pageNotFound">
        <div className="container d-flex justify-content-center" color="white">
          <RiveComponent
            style={{ width: 800, height: 800, display: "center" }}
          />
        </div>
      </div>
    </>
  );
};
export default connect()(ForbiddenPage);
