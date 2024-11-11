export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'disabled';
  order: number;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'disabled';
  order: number;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'disabled';
  price: {
    type: 'fixed' | 'range' | 'custom';
    value: number;
    min?: number;
    max?: number;
  };
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  required: boolean;
  options?: string[];
}