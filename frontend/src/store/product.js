// store/product.js
import { create } from 'zustand';

// Get the backend base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: 'All fields are required.' };
        }

        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Failed to create product.',
                };
            }

            set((state) => ({
                products: [...state.products, data.data],
            }));

            return {
                success: true,
                message: 'Product created successfully!',
            };
        } catch (error) {
            console.error('Create product failed:', error);
            return {
                success: false,
                message: 'Something went wrong. Please try again later.',
            };
        }
    },

    fetchProducts: async () => {
        try {
            const res = await fetch(`${BASE_URL}/products`);
            const data = await res.json();

            console.log('Fetched products:', data);

            if (Array.isArray(data.products)) {
                set({ products: data.products });
            } else if (Array.isArray(data)) {
                set({ products: data });
            } else {
                console.warn("Unexpected response structure:", data);
                set({ products: [] });
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            set({ products: [] });
        }
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`${BASE_URL}/products/${pid}`, {
            method: 'DELETE',
        });

        const data = await res.json();

        if (!data.success) {
            return {
                success: false,
                message: data.message || 'Failed to delete product.',
            };
        }

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));

        return {
            success: true,
            message: 'Product deleted successfully!',
        };
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`${BASE_URL}/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();
            console.log('API Response:', data);

            if (!data.success) {
                console.error('Update failed:', data.message);
                return { success: false, message: data.message };
            }

            set((state) => {
                const updatedProducts = state.products.map((product) => {
                    if (product._id === pid) {
                        return data.data && typeof data.data === 'object'
                            ? data.data
                            : { ...product, ...updatedProduct };
                    }
                    return product;
                });

                return { products: updatedProducts };
            });

            return { success: true, message: data.message };
        } catch (error) {
            console.error('Update product error:', error);
            return {
                success: false,
                message: 'Failed to update product',
            };
        }
    },
}));
