import View3D, { FloorARSession, SceneViewerSession } from '@egjs/view3d';
import React from 'react';

const view3d = new View3D('#view3d-canvas');
const overlay = new View3D('#overlay');
/*
 * Sessions will be used in the order in which they are added.
 */

// WebXR API based AR session, this will use the currently displayed model.
const floorSession = new FloorARSession({
  // Root element for dom-overlay above AR session
  overlayRoot: overlay,
  // Element to show loading indicator until the floor is found.
  loadingEl: '#loading',
  // Prevent entering to AR session without dom-overlay feature.
  forceOverlay: true,
})
  .on('start', () => {
    overlay.style.display = 'flex';
  })
  .on('end', () => {
    overlay.style.display = 'none';
  });
view3d.xr.addSession(floorSession);

// Fallback, by using Google's SceneViewer for browsers with no WebXR API
// view3d.xr.addSession(
//   new SceneViewerSession({
//     file: new URL('./assets/specstand.glb', location.href).href,
//     title: 'Animated Dragon',
//     link:
//       'https://sketchfab.com/3d-models/animated-dragon-0ea921bb3d504023b891bba3fb8e6111',
//     resizable: false,
//     mode: 'ar_only',
//   })
// );

const arButton = document.getElementById('#ar-button');

// You can attach handler on any button you make
arButton.addEventListener('click', async () => {
  view3d.xr.enter().catch((err) => {
    alert(err);
    console.error(err);
  });
});

const NewDemo = () => {
  return (
    <>
      <div class="view3d-canvas-wrapper">
        <canvas id="view3d-canvas"></canvas>
        <div id="ar-button">
          <svg
            id="ar-icon"
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 30 L 50 15 L 80 30 L 50 45 L 20 30 V 70 L 50 85 L 80 70 V 30 M 50 45 V 85"
              fill="transparent"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>View in AR</span>
        </div>
      </div>
      <div id="overlay">
        <div id="xr-close">
          <svg
            id="close-icon"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="2"
              y1="22"
              x2="22"
              y2="2"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="2"
              y1="2"
              x2="22"
              y2="22"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </div>
        <div id="loading">
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>바닥면을 찾는 중입니다...</div>
          <div>방 안을 밝게 해주시고 화면을 이리저리 움직여주세요</div>
        </div>
      </div>
    </>
  );
};

export default NewDemo;
