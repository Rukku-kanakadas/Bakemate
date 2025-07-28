import React, { useState } from 'react';
import { Package, Users, TrendingUp, ShoppingCart, Calendar, Settings, BarChart3, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminPageProps {
  onPageChange: (page: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onPageChange }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <button
            onClick={() => onPageChange('home')}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'sales', name: 'Sales Reports', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'orders':
        return <OrdersContent />;
      case 'inventory':
        return <InventoryContent />;
      case 'employees':
        return <EmployeesContent />;
      case 'sales':
        return <SalesContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bakery operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent: React.FC = () => {
  const stats = [
    { name: 'Today\'s Orders', value: '24', change: '+12%', icon: ShoppingCart, color: 'bg-blue-500' },
    { name: 'Revenue', value: '$2,847', change: '+8%', icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Active Orders', value: '7', change: '+3%', icon: Package, color: 'bg-amber-500' },
    { name: 'Customers', value: '189', change: '+15%', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from yesterday</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id: '#1234', customer: 'John Doe', items: 'Chocolate Cake, Cookies', status: 'preparing', total: '$67.99' },
              { id: '#1235', customer: 'Jane Smith', items: 'Wedding Cake', status: 'confirmed', total: '$299.99' },
              { id: '#1236', customer: 'Mike Johnson', items: 'Bread, Pastries', status: 'ready', total: '$24.50' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.total}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Add Product', icon: Package, color: 'bg-amber-500' },
              { name: 'View Orders', icon: ShoppingCart, color: 'bg-blue-500' },
              { name: 'Manage Staff', icon: UserCheck, color: 'bg-green-500' },
              { name: 'Sales Report', icon: BarChart3, color: 'bg-purple-500' },
            ].map((action) => (
              <button
                key={action.name}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className={`${action.color} p-3 rounded-full text-white mb-2`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Orders Content Component
const OrdersContent: React.FC = () => {
  const orders = [
    { id: '#1234', customer: 'John Doe', items: 'Chocolate Cake, Cookies', status: 'preparing', total: '$67.99', date: '2024-01-15', type: 'delivery' },
    { id: '#1235', customer: 'Jane Smith', items: 'Wedding Cake (Custom)', status: 'confirmed', total: '$299.99', date: '2024-01-15', type: 'pickup' },
    { id: '#1236', customer: 'Mike Johnson', items: 'Artisan Bread, Pastries', status: 'ready', total: '$24.50', date: '2024-01-14', type: 'pickup' },
    { id: '#1237', customer: 'Sarah Wilson', items: 'Birthday Cake', status: 'delivered', total: '$45.99', date: '2024-01-14', type: 'delivery' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
          <div className="flex space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500">
              <option>All Orders</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 text-gray-900">{order.items}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.type === 'delivery' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800' :
                    order.status === 'delivered' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-amber-500"
                    defaultValue={order.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inventory Content Component
const InventoryContent: React.FC = () => {
  const inventory = [
    { id: '1', name: 'Flour (All-Purpose)', quantity: 50, unit: 'lbs', lowStock: 10, lastUpdated: '2024-01-15' },
    { id: '2', name: 'Sugar (Granulated)', quantity: 25, unit: 'lbs', lowStock: 15, lastUpdated: '2024-01-15' },
    { id: '3', name: 'Butter', quantity: 8, unit: 'lbs', lowStock: 5, lastUpdated: '2024-01-14' },
    { id: '4', name: 'Eggs', quantity: 120, unit: 'pieces', lowStock: 24, lastUpdated: '2024-01-15' },
    { id: '5', name: 'Chocolate Chips', quantity: 3, unit: 'lbs', lowStock: 5, lastUpdated: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Total Items', value: '47', color: 'bg-blue-500' },
          { name: 'Low Stock Alerts', value: '3', color: 'bg-red-500' },
          { name: 'Last Updated', value: 'Today', color: 'bg-green-500' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
              Add Item
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.quantity <= item.lowStock 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.quantity <= item.lowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Employees Content Component
const EmployeesContent: React.FC = () => {
  const employees = [
    { id: '1', name: 'Alice Johnson', email: 'alice@bakery.com', role: 'Head Baker', hireDate: '2020-03-15', status: 'active' },
    { id: '2', name: 'Bob Smith', email: 'bob@bakery.com', role: 'Pastry Chef', hireDate: '2021-07-20', status: 'active' },
    { id: '3', name: 'Carol Davis', email: 'carol@bakery.com', role: 'Sales Associate', hireDate: '2022-01-10', status: 'active' },
    { id: '4', name: 'David Wilson', email: 'david@bakery.com', role: 'Delivery Driver', hireDate: '2023-05-05', status: 'inactive' },
  ];

  return (
    <div className="space-y-6">
      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Total Employees', value: '12', color: 'bg-blue-500' },
          { name: 'Active Staff', value: '10', color: 'bg-green-500' },
          { name: 'New This Month', value: '2', color: 'bg-amber-500' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Employee Management</h2>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
              Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{employee.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{employee.hireDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sales Content Component
const SalesContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: 'Today\'s Sales', value: '$2,847', change: '+12%', color: 'bg-green-500' },
          { name: 'This Week', value: '$18,492', change: '+8%', color: 'bg-blue-500' },
          { name: 'This Month', value: '$67,834', change: '+15%', color: 'bg-amber-500' },
          { name: 'Average Order', value: '$32.45', change: '+5%', color: 'bg-purple-500' },
        ].map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Best Selling Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Best Selling Items</h3>
          <div className="space-y-4">
            {[
              { name: 'Chocolate Layer Cake', sales: 47, revenue: '$2,162' },
              { name: 'Chocolate Chip Cookies', sales: 89, revenue: '$1,156' },
              { name: 'Artisan Sourdough', sales: 34, revenue: '$306' },
              { name: 'Red Velvet Cake', sales: 28, revenue: '$1,400' },
            ].map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sales} sold</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {[
              { category: 'Cakes', percentage: 45, amount: '$12,450' },
              { category: 'Cookies', percentage: 30, amount: '$8,300' },
              { category: 'Breads', percentage: 20, amount: '$5,520' },
              { category: 'Custom Orders', percentage: 5, amount: '$1,380' },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-gray-600">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Content Component
const SettingsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Store Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Store Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              defaultValue="Sweet Dreams Bakery"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="(555) 123-CAKE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              defaultValue="123 Bakery Street, Sweet City, SC 12345"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Hours</h3>
        <div className="space-y-4">
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map((day) => (
            <div key={day} className="flex items-center justify-between">
              <span className="font-medium text-gray-900 w-24">{day}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  defaultValue="06:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  defaultValue="21:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Closed</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h3>
        <div className="space-y-4">
          {[
            { name: 'New Orders', description: 'Get notified when new orders are placed' },
            { name: 'Low Stock Alerts', description: 'Alert when inventory items are running low' },
            { name: 'Daily Sales Report', description: 'Receive daily sales summary via email' },
            { name: 'Customer Reviews', description: 'Notification for new customer reviews' },
          ].map((setting) => (
            <div key={setting.name} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{setting.name}</p>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminPage;