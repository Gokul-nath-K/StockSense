import './App.css';
import SignInPage from './Page/SignInPage';
import SignUpPage from './Page/SignUpPage';
import MainLayout from './Layout/MainLayout';
import Home from './Page/Home';
import { productContext } from './Data/ProductContext'
import { useReducer, useState } from 'react';
import EditProduct from './Page/EditProduct';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { getPagedProducts } from './service/ProductApi/product';

const router = createBrowserRouter(

  createRoutesFromElements(
    <>
      <Route index element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/main' element={<MainLayout />} >
        <Route index element={<Home />} />
      </Route>
      <Route path='/update' element={<EditProduct />} />
    </>
  )
)
function App() {

  const [products, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);
  
  function fetchData(no, size) {
    try {
      getPagedProducts(no, size).then((res) => {
        dispatch({ type: "fetch", items: res.data ? res.data : [] });
        setLoading(false);
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  
  function reducer(products, action) {

    switch (action.type) {

      case 'fetch':
        products.splice(0, products.length, ...action.items);
        return [...products]
        break;
      case 'add':
        products.push(action.items);
        return products;
        break;
      case 'delete':
        return action.updatedProducts;
        break;
      default:
        break;
    }

  }


  return (
    <>
      <productContext.Provider value={{ products, dispatch, loading, setLoading, fetchData }}>
        <RouterProvider router={router} />
      </productContext.Provider>
    </>
  );
}

export default App;
