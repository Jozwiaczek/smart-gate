import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CircleLoader } from '../../../../../elements';
import { useAxios } from '../../../../../hooks';
import { getApiUrl, isCameraPreviewEnabled } from '../../../../../utils';
import {
  CameraPreview,
  LoadingContainer,
  LoadingLabel,
  Wrapper,
} from './CameraPreviewSection.styled';

const CameraPreviewSection = () => {
  const apiUrl: string = getApiUrl();
  const cameraURL = `${apiUrl}/camera`;
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
    <Wrapper>
      {!isPreviewLoaded && (
        <LoadingContainer>
          <CircleLoader variant="small" />
          <LoadingLabel>{t('routes.dashboard.sections.camera.loadingPreview')}</LoadingLabel>
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
    </Wrapper>
  );
};

export default CameraPreviewSection;
