import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAxios } from '../../../../../hooks';
import { isCameraPreviewEnabled } from '../../../../../utils';
import { CameraPreview, LoadingContainer, LoadingContent } from './CameraPreviewSection.styled';

const CameraPreviewSection = () => {
  const cameraURL = process.env.REACT_APP_API_URL && `${process.env.REACT_APP_API_URL}/camera`;
  const previewRef = useRef<HTMLImageElement>(null);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const { t } = useTranslation();
  const axios = useAxios();

  const reloadCameraPreview = useCallback(() => {
    axios
      .get<string>('/ticket/generate')
      .then((generatedTicket) => {
        if (previewRef.current && cameraURL) {
          previewRef.current.src = `${cameraURL}/?ticket=${generatedTicket.data}`;
        }
      })
      .catch((ticketErr) => console.log(ticketErr));
  }, [axios, cameraURL]);

  useLayoutEffect(() => {
    reloadCameraPreview();
    window.addEventListener('focus', reloadCameraPreview);
    return () => {
      window.removeEventListener('focus', reloadCameraPreview);
    };
  }, [cameraURL, reloadCameraPreview]);

  if (!isCameraPreviewEnabled()) {
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
