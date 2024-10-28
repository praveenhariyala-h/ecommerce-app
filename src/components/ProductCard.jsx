import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { StarIcon } from '@heroicons/react/24/outline';
import { notifications } from '../utils/notifications';


const ProductCard = ({ product }) => {
  const [showReviews, setShowReviews] = useState(false);
  const dispatch = useDispatch();
  const spring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
  });

  const addItemToCart = () => {
    
    // Add toast notification here
    try {
      dispatch(addToCart(product));
      notifications.success(`${product.title} added to cart!`);
    } catch (error) {
      notifications.error('Failed to add item to cart');
    }
  };

  return (
    <animated.div style={spring} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {product.discountPercentage}% OFF
        </span>
      </div>
      <h3 className=" p-4 text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
      <div className="p-4 mt-auto">
       
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${
                index < Math.floor(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addItemToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-md transition duration-200 ${
            product.stock > 0
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      
      </div>
    </animated.div>
  );
};

export default ProductCard;