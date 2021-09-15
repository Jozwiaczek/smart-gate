import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CameraPreview, LoadingContainer, LoadingContent } from './CameraPreviewSection.styled';

const CameraPreviewSection = () => {
  const cameraURL = process.env.REACT_APP_API_URL && `${process.env.REACT_APP_API_URL}/camera`;
  const previewRef = useRef<HTMLImageElement>(null);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const { t } = useTranslation();

  const reloadCameraPreview = useCallback(() => {
    if (previewRef.current && cameraURL) {
      const requestPreviewTime = new Date().getTime();
      previewRef.current.src = `${cameraURL}/?t=${requestPreviewTime}`;
    }
  }, [cameraURL]);

  useLayoutEffect(() => {
    reloadCameraPreview();
    window.addEventListener('focus', reloadCameraPreview);
    return () => {
      window.removeEventListener('focus', reloadCameraPreview);
    };
  }, [cameraURL, reloadCameraPreview]);

  if (process.env.REACT_APP_CAMERA_PREVIEW_ENABLED !== 'true') {
    return null;
  }

  return (
    <div>
      {!isPreviewLoaded && (
        <LoadingContainer>
          <LoadingContent>
            <h3>{t('routes.dashboard.sections.camera.loadingPreview')}</h3>
          </LoadingContent>
        </LoadingContainer>
      )}
      <CameraPreview
        ref={previewRef}
        isLoaded={isPreviewLoaded}
        alt={t('routes.dashboard.sections.camera.title')}
        onLoad={() => {
          setIsPreviewLoaded(true);
        }}
      />
    </div>
  );
};

export default CameraPreviewSection;
