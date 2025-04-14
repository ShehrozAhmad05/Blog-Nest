import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { store } from './redux/store/store.js'
import App from './App.jsx'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

//create a instance of QueryClient
const queryClient = new QueryClient()
//configure the stripe
const stripePromise = loadStripe('pk_test_51QQaCqDwNW0jUCigy0UVrdM7I1IhiSldgy8nsQRwCGL4oJjbdFqCkr05JfG5qbipcA5sabcEcbq1HiFohEHTlmjV00gbXAD6Uo')
//stripe options
const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Elements stripe={stripePromise} options={options}>
        <App /> 
      </Elements>
      </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
