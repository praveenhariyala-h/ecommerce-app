import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from '../store/api/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { StarIcon, FilterIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const spring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
  });

  const addItemToCart = () => {
    dispatch(addToCart(product));
    // Add toast notification here
  };

  return (
    <animated.div style={spring} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
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

const me = ()=>{
  
}
const FilterSidebar = ({ categories, selectedCategory, onSelectCategory, setShowFilters, onClose }) => (
  <div className="w-64 bg-white p-4 border-r">
    <h2 className="text-lg font-semibold mb-4">Categories</h2>
    <div className="space-y-2">
      <button
        onClick={() => {onSelectCategory('all'); setShowFilters(false)}}
        className={`w-full text-left px-4 py-2 rounded-md ${
          selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
        }`}
      >
        All Products
      </button>
      {categories?.map((category,i) => (
        <button
          key={i}
          onClick={() => {onSelectCategory(category); setShowFilters(false)}}
          className={`w-full text-left px-4 py-2 rounded-md ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
);

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: categoriesQuery } = useGetProductsByCategoryQuery(selectedCategory.slug);
  const [sortBy, setSortBy] = useState('default');
  console.log(categories);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  console.log(selectedCategory)
  const filteredProducts = selectedCategory === 'all' 
    ? products.products
    : categoriesQuery.products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-gray-100 p-2 rounded-md"
          >
            {/* <FilterIcon className="h-6 w-6" /> */}
           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>


            
          </button>
        </div>
      </div>

      <div className="flex">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-50 md:relative md:block"
            >
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                setShowFilters={setShowFilters}
                onClose={() => setShowFilters(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden md:block">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            setShowFilters={setShowFilters}
          />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
