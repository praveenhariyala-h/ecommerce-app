import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { notifications } from '../utils/notifications';

export default function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
    console.log(cartItems);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (itemId, itemName) => {
    dispatch(removeFromCart(itemId));
    notifications.info(`${itemName} removed from cart`);
  };

  const handleUpdateQuantity = (id, quantity, itemName) => {
    dispatch(updateQuantity({ id, quantity }));
    notifications.success(`Updated ${itemName} quantity to ${quantity}`);
  };

  return (
    <div className=" right-0 top-0 bg-white shadow-lg p-6 overflow-y-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Shopping Cart</h2>
      
      <AnimatePresence>
        {cartItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-4 border-b py-4"
          >
            <img src={item.images[0]} alt={item.title} className="w-40 h-40 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <select
                  value={item.quantity}
                //   onChange={(e) => dispatch(updateQuantity({ 
                //     id: item.id, 
                //     quantity: parseInt(e.target.value) 
                //   }))}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value), item.title)}
                  className="border rounded p-1 w-20"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <button
                //   onClick={() => dispatch(removeFromCart(item.id))}
                onClick={() => handleRemoveItem(item.id, item.title)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mt-6 text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
