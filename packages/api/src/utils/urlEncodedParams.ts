import base64url from 'base64url';

const UrlEncodedParams = (url: string, ...params: string[]): string => {
  const encodedParams = params.map((s) => base64url.encode(s));

  return `${url}/${encodedParams.join('/')}`;
};

export default UrlEncodedParams;
