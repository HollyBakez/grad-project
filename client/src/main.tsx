import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BudgetsProvider from './components/BudgetsProvider/BudgetsProvider.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Header from './components/Header/Header.tsx'
import App from './routes/App/App.tsx'
import ExpenseCalc from './routes/ExpenseCalc/ExpenseCalc.tsx';
import SavingsCalc from './routes/SavingsCalc/SavingsCalc.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
      path: "/expenses-calculator",
      element: <ExpenseCalc/>,
      errorElement: <ErrorPage/>,
  },
  {
    path: "/savings-calculator",
    element: <SavingsCalc/>,
    errorElement: <ErrorPage/>,
  }
]


);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetsProvider>
      <Header/>
      <RouterProvider router={router} />
    </BudgetsProvider>

  </React.StrictMode>,
)
