// store/product.js
import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        // Validate required fields
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: 'All fields are required.' };
        }

        try {
            const response = await fetch('/api/products', {
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

            // Update store state
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
            const res = await fetch("/api/products");
            const data = await res.json();
    
            // Log the data to verify its structure
            console.log('Fetched products:', data);
    
            // If response is an object with a `products` array
            if (Array.isArray(data.products)) {
                set({ products: data.products });
            } 
            // If response is already an array
            else if (Array.isArray(data)) {
                set({ products: data });
            } 
            // Unexpected structure
            else {
                console.warn("Unexpected response structure:", data);
                set({ products: [] }); // fallback
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            set({ products: [] }); // fallback on error
        }
    },
    

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE',
        });

        const data = await res.json();

        if (!data.success) return { success: false, message: data.message || 'Failed to delete product.' };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));

        return { success: true, message: 'Product deleted successfully!' };
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            
            const data = await res.json();
            console.log('API Response:', data);
            
            if (!data.success) {
                console.error('Update failed:', data.message);
                return { success: false, message: data.message };
            }

            // Debug: Check what we're getting back
            console.log('Updated product data:', data.data);
            
            // update the ui immediately, without needing a refresh
            set((state) => {
                console.log('Current products before update:', state.products);
                
                const updatedProducts = state.products.map((product) => {
                    if (product._id === pid) {
                        return data.data && typeof data.data === 'object' ? data.data : { ...product, ...updatedProduct };
                    }
                    return product;
                });
                
                return { products: updatedProducts };
            });

            return { success: true, message: data.message };
        } catch (error) {
            console.error('Update product error:', error);
            return { success: false, message: 'Failed to update product' };
        }
    },
}));
