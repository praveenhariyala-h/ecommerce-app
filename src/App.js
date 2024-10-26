import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;








// import { Suspense } from 'react';
// import Navbar from './components/Navbar';
// import ProductList from './components/ProductList';
// //import ShoppingCart from './components/ShoppingCart';

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Suspense fallback={
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       }>
//         <ProductList />
//       </Suspense>
//       {/* <ShoppingCart /> */}
//     </div>
//   );
// }

// export default App;
