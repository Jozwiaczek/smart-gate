import base64url from 'base64url';

type ParamsObject = { [key: string]: string };
const UrlEncodedParams = (url: string, params: ParamsObject): string => {
  let path = `${url}?`;
  path += Object.keys(params)
    .map((key) => {
      const encodeValue = base64url.encode(params[key]);
      return `${key}=${encodeValue}`;
    })
    .join('&');

  return path;
};

export default UrlEncodedParams;
