// lib/api.ts
export const API_URL = 'http://localhost:4000';

// Type definitions
export interface Market {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  isBought: boolean;
  market: Market;
  category: Category;
}

export interface CreateProductDto {
  name: string;
  marketId: number;
  categoryId: number;
  isBought?: boolean;
}

export interface CreateCategoryDto {
  name: string;
}

export interface CreateMarketDto {
  name: string;
}

// Helper function for error handling
const handleApiError = async (res: Response, errorMessage: string) => {
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`${errorMessage}: ${res.status} ${res.statusText} - ${errorData}`);
  }
};

export const fetchMarkets = async (): Promise<Market[]> => {
  try {
    const res = await fetch(`${API_URL}/market`);
    await handleApiError(res, 'Markets fetch failed');
    const data = await res.json(); // Missing await here
    return data;
  } catch (error) {
    console.error('Error fetching markets:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL}/category`);
    await handleApiError(res, 'Categories fetch failed');
    const data = await res.json(); // Missing await here
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_URL}/product`); // Use consistent API_URL
    await handleApiError(res, 'Products fetch failed');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
  try {
    const res = await fetch(`${API_URL}/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    await handleApiError(res, 'Product creation failed');
    return await res.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error; // Re-throw to let caller handle
  }
};

export const createCategory = async (category: CreateCategoryDto): Promise<Category> => {
  try {
    const res = await fetch(`${API_URL}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });

    await handleApiError(res, 'Category creation failed');
    return await res.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const createMarket = async (market: CreateMarketDto): Promise<Market> => {
  try {
    const res = await fetch(`${API_URL}/market`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(market)
    });

    await handleApiError(res, 'Market creation failed');
    return await res.json();
  } catch (error) {
    console.error('Error creating market:', error);
    throw error;
  }
};

// Additional utility functions you might need
export const updateProduct = async (id: number, updates: Partial<CreateProductDto>): Promise<Product> => {
  try {
    const res = await fetch(`${API_URL}/product/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    await handleApiError(res, 'Product update failed');
    return await res.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}/product/${id}`, {
      method: 'DELETE'
    });

    await handleApiError(res, 'Product deletion failed');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};