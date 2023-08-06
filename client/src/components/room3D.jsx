import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import { Box, OrbitControls } from '@react-three/drei';
import pinIcon from '../assets/location-pin.png';



const Room3D = () => {
  const [pins, setPins] = useState([]);

  const pinTexture = useLoader(THREE.TextureLoader, pinIcon);

  const handleRoomClick = (event) => {
    const { point } = event;
    setPins([...pins, point]);
  };

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight color="red" position={[0, 0, 5]} intensity={0.5} />
      <directionalLight color="blue" position={[0, 5, 0]} intensity={0.5} />
      <directionalLight color="green" position={[5, 0, 0]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} />

      <Box onClick={handleRoomClick}>
        <meshStandardMaterial />
      </Box>

      {pins.map((pin, index) => {
        const spriteMaterial = new THREE.SpriteMaterial({ map: pinTexture });
        return (
          <sprite
            material={spriteMaterial}
            position={[pin.x, pin.y, pin.z]}
            key={index}
            scale={[0.1, 0.1, 1]} 
          />
        );
      })}

      <OrbitControls />
    </Canvas>
  );
};

export default Room3D;
