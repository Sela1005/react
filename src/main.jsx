import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
root.render(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
