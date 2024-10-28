import { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from '../store/api/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { StarIcon, FilterIcon } from '@heroicons/react/24/outline';
import { notifications } from '../utils/notifications';
import  Reviews from './Reviews';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';


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
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredSeachProducts = [...filteredProducts].filter(product => {
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);
    
    return matchesSearch;
  })

  const sortedProducts = [...filteredSeachProducts].sort((a, b) => {
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
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold hidden md:block">Our Products</h1>
        <div className="relative w-full max-w-xl">
        <SearchBar onSearch={handleSearch} />
      </div>
        <div className="flex items-center space-x-4 sm:w-50 md:w-auto" >
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
