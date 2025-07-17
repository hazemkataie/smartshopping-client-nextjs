'use client';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/lib/api';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
        // print products to console for debugging
    }, []);

    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Ürünler</h2>
            <ul className="space-y-2">
                {products.map((p) => (
                    <li key={p.id} className="border p-2 rounded">
                        {p.name} — {p.market?.name} / {p.category?.name} — {p.isBought ? '✅' : '❌'}
                    </li>
                ))}
            </ul>
        </div>
    );
}