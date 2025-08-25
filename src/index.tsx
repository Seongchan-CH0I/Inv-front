import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from '@tanstack/react-query';
import { handleApiError } from './utils/errorHandler';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: handleApiError,
    }),
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);
