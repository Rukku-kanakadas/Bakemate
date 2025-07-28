import { Product } from '../types';

export const products: Product[] = [
  // Cakes
  {
    id: '1',
    name: 'Chocolate Layer Cake',
    price: 45.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cakes',
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar'],
    availability: true,
    description: 'Rich, moist chocolate cake with layers of creamy chocolate frosting.'
  },
  {
    id: '2',
    name: 'Vanilla Birthday Cake',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cakes',
    ingredients: ['Vanilla', 'Flour', 'Eggs', 'Butter', 'Sugar'],
    availability: true,
    description: 'Classic vanilla cake perfect for any celebration.'
  },
  {
    id: '3',
    name: 'Red Velvet Cake',
    price: 49.99,
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cakes',
    ingredients: ['Cocoa', 'Red Food Coloring', 'Flour', 'Eggs', 'Cream Cheese'],
    availability: true,
    description: 'Elegant red velvet cake with cream cheese frosting.'
  },
  
  // Cookies
  {
    id: '4',
    name: 'Chocolate Chip Cookies',
    price: 12.99,
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cookies',
    ingredients: ['Chocolate Chips', 'Flour', 'Butter', 'Brown Sugar'],
    availability: true,
    description: 'Freshly baked chocolate chip cookies (dozen).'
  },
  {
    id: '5',
    name: 'Sugar Cookies',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1853542/pexels-photo-1853542.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cookies',
    ingredients: ['Flour', 'Sugar', 'Butter', 'Vanilla'],
    availability: true,
    description: 'Classic sugar cookies with decorative icing (dozen).'
  },
  {
    id: '6',
    name: 'Oatmeal Raisin Cookies',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'cookies',
    ingredients: ['Oats', 'Raisins', 'Flour', 'Cinnamon', 'Brown Sugar'],
    availability: true,
    description: 'Hearty oatmeal cookies with plump raisins (dozen).'
  },
  
  // Breads
  {
    id: '7',
    name: 'Artisan Sourdough',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'breads',
    ingredients: ['Sourdough Starter', 'Flour', 'Salt', 'Water'],
    availability: true,
    description: 'Traditional sourdough bread with a crispy crust.'
  },
  {
    id: '8',
    name: 'Whole Wheat Bread',
    price: 6.99,
    image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'breads',
    ingredients: ['Whole Wheat Flour', 'Yeast', 'Honey', 'Salt'],
    availability: true,
    description: 'Nutritious whole wheat bread made with organic flour.'
  },
  {
    id: '9',
    name: 'French Baguette',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'breads',
    ingredients: ['Bread Flour', 'Yeast', 'Salt', 'Water'],
    availability: true,
    description: 'Authentic French baguette with a golden crust.'
  }
];