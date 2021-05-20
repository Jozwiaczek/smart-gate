import base64url from 'base64url';
import { useParams } from 'react-router-dom';

const useEncodedParams = <T>(): T => {
  const params = useParams<T>();
  const decode = { ...params };
  Object.keys(params).forEach((key) => {
    (decode as unknown as Record<string, string>)[key] = base64url.decode((params as never)[key]);
  });
  return decode;
};

export default useEncodedParams;
