import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Welcome from '../components/HomePage/Welcome';
import Services from '../components/Services/Services';
import ClientQuotes from '../components/QuoteRequest/ClientQuotes';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/Home",
        element: <Welcome />,
      },
      {
        path: "/Services",
        element: <Services />,
      },
      {
        path: "/MyQuotes",
        element: <ClientQuotes />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);