import { Button } from '@material-ui/core';
import base64url from 'base64url';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from '../../hooks';
import useAxios from '../../hooks/useAxios';

const options: CredentialCreationOptions = {
  publicKey: {
    rp: {
      name: 'smart-gate.app',
    },
    user: {
      id: new Uint8Array(16), // user id
      name: 'joe.doe@example.com', // user email
      displayName: 'Joe Doe', // user full name
    },
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7,
      },
    ],
    attestation: 'direct',
    authenticatorSelection: { userVerification: 'preferred' },
    challenge: new Uint8Array([
      // must be a cryptographically random number sent from a server
      0x8c,
      0x0a,
      0x26,
      0xff,
      0x22,
      0x91,
      0xc1,
      0xe9,
      0xb9,
      0x4e,
      0x2e,
      0x17,
      0x1a,
      0x98,
      0x6a,
      0x73,
      0x71,
      0x9d,
      0x43,
      0x48,
      0xd5,
      0xa7,
      0x6a,
      0x15,
      0x7e,
      0x38,
      0x94,
      0x52,
      0x77,
      0x97,
      0x0f,
      0xef,
    ]).buffer,
  },
};

const publicKeyCredentialToJSON = (pubKeyCred: any): any => {
  if (pubKeyCred instanceof Array) {
    return pubKeyCred.map((item) => publicKeyCredentialToJSON(item));
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred as Buffer);
  }

  if (pubKeyCred instanceof Object) {
    const obj = {};

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in pubKeyCred) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
};

const EnablePlatformAuth = () => {
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const axios = useAxios();
  const API_URL = process.env.REACT_APP_API_URL;

  const onAccept = async () => {
    try {
      const isPlatformAuthAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (isPlatformAuthAvailable) {
        const publicKeyCredential = await navigator.credentials.create(options);
        const json = publicKeyCredentialToJSON(publicKeyCredential);
        console.log('L:99 | json: ', json);
        // const response = await axios.post(
        //   `${API_URL}/webauthn/register`,
        //   {
        //     publicKeyCredential: json,
        //   },
        //   { withCredentials: true },
        // );
      }
    } catch (e) {
      console.error('Error: ', e);
      showSnackbar({
        message: e.message,
        severity: 'error',
      });
    }
  };

  const onCancel = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Platform authentication method</h1>
      <p>
        Platform authentication is device native authentication method.
        <br />
        Do You want to enabled it?
      </p>
      <Button variant="contained" onClick={onCancel}>
        Cancel
      </Button>
      <Button color="primary" variant="contained" onClick={onAccept}>
        No other way!
      </Button>
    </div>
  );
};

export default EnablePlatformAuth;
