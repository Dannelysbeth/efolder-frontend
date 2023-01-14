import React from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { connect } from "react-redux";
import "../css/app.css";

const NotFoundPage = () => {
  const { RiveComponent } = useRive({
    src: "https://public.rive.app/community/runtime-files/3257-6868-404.riv",
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
export default connect()(NotFoundPage);
