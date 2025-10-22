import { lazy, Suspense } from 'react';
import Nav from '../components/NavBar/Nav'

const Products = lazy(() => import('../components/Products/Products'));

import { LoadingAnimation } from '../components/Animation/Loading';


function ProductPage() {
  return (
    <div>
      
      <Suspense
        fallback={<div className="flex justify-center items-center h-screen"><LoadingAnimation/></div>}>
        <Products />
      </Suspense>
    </div>
  );
}

export default ProductPage;


