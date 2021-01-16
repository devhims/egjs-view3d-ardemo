import View3D, {
  AutoDirectionalLight,
  ShadowPlane,
  SimpleLights,
  GLTFLoader,
  THREE,
  RotateControl,
  DistanceControl,
  FloorARSession,
} from '@egjs/view3d';
import React, { useRef, useEffect } from 'react';
import './viewstyles.css';
// import './common.css';
import './ar.css';
// import './prism.css';
// import spec from './assets/specstand.glb';
//import spec from './assets/animated_dragon/scene.gltf';
// import spec from './assets/dragon.glb';
//import spec from '../p assets/NormalChair.glb';

const WebARTest = () => {
  const canvasElement = useRef(null);
  const overlayElement = useRef(null);
  let view3d;

  const handleClick = async () => {
    view3d.xr.enter().catch((err) => {
      alert(err);
      console.error(err);
    });
  };

  const handleClose = () => {
    view3d.xr.exit();
  };

  useEffect(() => {
    view3d = new View3D(canvasElement.current);

    const threeRenderer = view3d.renderer.threeRenderer;
    threeRenderer.physicallyCorrectLights = true;

    view3d.controller.add(new RotateControl());
    view3d.controller.add(new DistanceControl());

    const light1 = new THREE.DirectionalLight('#fff', 0.7);
    const light2 = new THREE.HemisphereLight('#fff', '#fff', 0.7);
    const light3 = new THREE.DirectionalLight('#fff', 0.7);
    const ambient = new THREE.AmbientLight('#fff', 0.3);
    const light = new AutoDirectionalLight();

    light.position.set(0, 5, 4);
    view3d.scene.addEnv(light);

    light1.position.set(0, 50, 40);
    light2.position.set(0, 50, 0);
    light3.position.set(0, 50, -40);

    view3d.scene.addEnv(light1, light2, light3, ambient);

    const shadowPlane = new ShadowPlane();
    view3d.scene.addEnv(shadowPlane);

    const loader = new GLTFLoader();
    loader
      .load('/assets/animated_dragon/scene.gltf')
      .then((model) => {
        model.castShadow = true;
        model.receiveShadow = true;
        view3d.display(model, {
          size: 140,
        });
        view3d.animator.play(0);
      })
      .catch((e) => {
        console.error(e);
      });

    const floorSession = new FloorARSession({
      overlayRoot: overlayElement,
      loadingEl: '#loading',
      forceOverlay: true,
    })
      .on('start', () => {
        overlayElement.style.display = 'flex';
      })
      .on('end', () => {
        overlayElement.style.display = 'none';
      });
  }, [canvasElement]);

  return (
    <>
      <div id="view3d-wrapper">
        <canvas id="ar-canvas" ref={canvasElement}></canvas>
        <div id="ar-button" onClick={handleClick}>
          <svg
            id="ar-icon"
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 30 L 50 15 L 80 30 L 50 45 L 20 30 V 70 L 50 85 L 80 70 V 30 M 50 45 V 85"
              fill="transparent"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>View in AR</span>
        </div>
      </div>
      <div id="overlay" ref={overlayElement}>
        <div id="xr-close" onClick={handleClose}>
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
              strokeWidth="2"
            ></line>
            <line
              x1="2"
              y1="2"
              x2="22"
              y2="22"
              stroke="white"
              strokeWidth="2"
            ></line>
          </svg>
        </div>
        <div id="loading">
          <div className="lds-spinner">
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

export default WebARTest;
