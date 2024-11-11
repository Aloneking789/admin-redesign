import React, { useState } from 'react';
import { 
  Plus, Upload, Download, Search, Filter,
  ArrowLeft, Layers, Package 
} from 'lucide-react';
import type { Category, SubCategory, Service } from '../types/category';
import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';

const Categories = () => {
  const [view, setView] = useState<'categories' | 'subcategories' | 'services'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Mock data
  const mockCategories: Category[] = [
    {
      id: '1',
      name: 'Home Services',
      slug: 'home-services',
      description: 'All home related services',
      status: 'active',
      order: 1,
      subCategories: [
        {
          id: '1-1',
          name: 'Cleaning',
          slug: 'cleaning',
          description: 'Home cleaning services',
          status: 'active',
          order: 1,
          services: [
            {
              id: '1-1-1',
              name: 'Regular Cleaning',
              description: 'Regular home cleaning service',
              status: 'active',
              price: {
                type: 'fixed',
                value: 100
              },
              customFields: []
            }
          ]
        }
      ]
    }
  ];

  const handleBulkAction = (action: string) => {
    // Implement bulk actions
    console.log('Bulk action:', action);
  };

  const renderHeader = () => {
    let title = 'Categories';
    let subtitle = 'Manage your service categories';

    if (view === 'subcategories' && selectedCategory) {
      title = selectedCategory.name;
      subtitle = 'Manage subcategories';
    } else if (view === 'services' && selectedSubCategory) {
      title = selectedSubCategory.name;
      subtitle = 'Manage services';
    }

    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {view !== 'categories' && (
            <button
              onClick={() => {
                if (view === 'services') {
                  setView('subcategories');
                  setSelectedSubCategory(null);
                } else {
                  setView('categories');
                  setSelectedCategory(null);
                }
              }}
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {view === 'services' ? 'Service' : view === 'subcategories' ? 'Subcategory' : 'Category'}
          </button>
        </div>
      </div>
    );
  };

  const renderToolbar = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${view}...`}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-[#00C8C8]"
          />
        </div>
        <div className="flex items-center space-x-3">
          <select className="input-primary">
            <option>Bulk Actions</option>
            <option>Enable Selected</option>
            <option>Disable Selected</option>
            <option>Delete Selected</option>
          </select>
          <button className="btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {renderHeader()}
      {renderToolbar()}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {view === 'categories' && (
          <CategoryList
            categories={mockCategories}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setView('subcategories');
            }}
            onEdit={(category) => {
              setSelectedCategory(category);
              setShowForm(true);
            }}
            onDelete={(id) => {
              // Implement delete
              console.log('Delete category:', id);
            }}
          />
        )}
        
        {/* Add pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 20 of 100 entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-[#00C8C8] text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <CategoryForm
          category={selectedCategory || undefined}
          onSubmit={(data) => {
            // Implement form submission
            console.log('Form data:', data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Categories;