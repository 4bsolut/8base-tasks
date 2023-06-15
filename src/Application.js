import React, { useCallback } from 'react';
import { AppProvider } from '8base-react-sdk';
import { BrowserRouter } from 'react-router-dom';

import { WORKSPACE_ENDPOINT } from './shared/constants';
import { authClient } from './shared/auth';
import { Routes } from './routes';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Application = () => {
  const onRequestSuccess = useCallback(({ operation }) => {
    const message = operation.getContext();

    if (message) {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }, []);

  const onRequestError = useCallback(({ graphQLErrors }) => {
    const hasGraphQLErrors = Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach((error) => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      <AppProvider
        uri={WORKSPACE_ENDPOINT}
        authClient={authClient}
        onRequestError={onRequestError}
        onRequestSuccess={onRequestSuccess}
      >
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
};
