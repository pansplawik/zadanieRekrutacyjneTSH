import './wdyr';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'assets/styles/main.css';

import { AppProviders } from 'providers/AppProviders';
import { AppRoutes } from 'routing/AppRoutes';
import { LoginProvider } from 'context/viewType/userContext';
import { ModalProvider } from 'context/viewType/modalContext';

const openReactQueryDevtools = import.meta.env.DEV;

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
}

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
  <ModalProvider>
    <LoginProvider>
      <AppProviders>
        <AppRoutes />
        {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </AppProviders>
    </LoginProvider>
  </ModalProvider>
);
