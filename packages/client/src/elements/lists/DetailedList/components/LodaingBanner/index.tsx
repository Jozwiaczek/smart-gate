import { getLabelFromSource } from '../../../../../utils';
import { Spinner } from '../../../../animations';
import { LoadingBannerContainer } from './LodaingBanner.styled';

const LoadingBanner = ({ resource }: LoadingBannerProps) => (
  <LoadingBannerContainer>
    <Spinner size="62px" />
    <h3>Loading {getLabelFromSource(resource)}...</h3>
  </LoadingBannerContainer>
);

export default LoadingBanner;
