import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
//import { auth } from '../firebase/config';
import {auth} from '../firebase/config'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Your Logo
            </Link>
            
            <div className="hidden md:flex space-x-4">
             
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                Products
              </NavLink>
              
             
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-600" />
                  )}
                  <span className="text-gray-700">{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}






// import { useState, useEffect } from 'react';
// import { auth } from '../firebase/config';
// import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
// import { UserCircleIcon } from '@heroicons/react/24/outline';

// export default function Navbar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <span className="text-xl font-bold text-gray-800">Your Logo</span>
//           </div>
          
//           <div className="flex items-center">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2">
//                   {user.photoURL ? (
//                     <img 
//                       src={user.photoURL} 
//                       alt="Profile" 
//                       className="w-8 h-8 rounded-full"
//                     />
//                   ) : (
//                     <UserCircleIcon className="w-8 h-8 text-gray-600" />
//                   )}
//                   <span className="text-gray-700">{user.displayName}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={handleLogin}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
//               >
//                 Login with Google
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
