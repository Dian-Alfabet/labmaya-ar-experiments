"use client"
import React, { useEffect, useRef, useState } from "react";

import "./viewerstyle.css";

// UID Model Sketchfab
const MODEL_UID = "dd958716be0b4786b8700125eec618e5";
// const MODEL_UID = "c632823b6c204797bd9b95dbd9f53a06";
// const MODEL_UID = "d75f531255ad47a99051a4c421c8861b";

const useSketchfabViewer = (sketchfabUrl: string = MODEL_UID) => {
  // Refs untuk iframe dan API Sketchfab
  const viewerIframeRef = useRef(null);
  const [api, setApi] = useState(null);

  const ViewerIframe = (
    <iframe
      className="newiframe"
      ref={viewerIframeRef}
      title="sketchfab-viewer"
      style={{ height: "600px", width: "100%" }}
    />
  );

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (window.Sketchfab hanya ada di sisi klien)
    {/* @ts-ignore */}
    if (typeof window !== "undefined" && window.Sketchfab) {
      {/* @ts-ignore */}
      const client = new window.Sketchfab(viewerIframeRef.current);

      client.init(sketchfabUrl, {
        ui_controls: 0,
        ui_watermark: 0,
        ui_start: 0,
        ui_settings: 0,
        ui_infos: 0,
        ui_stop: 0,
        success: function onSuccess( api: any ){
          setApi(api);
          api.start();
          api.addEventListener( 'viewerready', function() {
              console.log( 'Viewer is ready' );
          } );
      },
        error: () => {
          console.log("Viewer error");
        },
      });
    }
  }, []);

  return [ViewerIframe, api];
};

const Viewer = ({ apiRef, sketchfabUrl }: any) => {
  const [ViewerIframe, api] = useSketchfabViewer(sketchfabUrl);

  // Memberikan akses API ke komponen parent melalui ref
  useEffect(() => {
    if (apiRef && api) {
      apiRef.current = api;
    }
  }, [api, apiRef]);

  return ViewerIframe;
};

export default Viewer;
