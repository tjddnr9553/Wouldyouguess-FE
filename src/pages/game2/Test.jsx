import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
// import getCroppedImg from './cropImage'; // 이미지 자르기 유틸리티 함수

const Test = ({ image, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      // const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      // onSave(croppedImage); // 자른 이미지를 부모 컴포넌트로 전달
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, onSave]);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1} // 1:1 비율
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <button onClick={handleSave}>Save and Upload</button>
    </div>
  );
};

export default Test;