import React from 'react';
import { ChevronRight, Edit3, Trash2, MoreVertical } from 'lucide-react';
import type { Category } from '../../types/category';

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sub-categories
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Services
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <button
                  onClick={() => onSelectCategory(category)}
                  className="flex items-center text-[#00C8C8] hover:text-[#00B4B4]"
                >
                  <span className="font-medium">{category.name}</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {category.subCategories.length}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {category.subCategories.reduce(
                  (acc, sub) => acc + sub.services.length,
                  0
                )}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    category.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {category.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;