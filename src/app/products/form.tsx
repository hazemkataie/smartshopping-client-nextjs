'use client';
import { useEffect, useState } from 'react';
import { createProduct, fetchMarkets, fetchCategories, Market, Category } from '@/lib/api';

interface FormState {
    name: string;
    marketId: string;
    categoryId: string;
    isBought: boolean;
}

export default function ProductForm() {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<FormState>({
        name: '',
        marketId: '',
        categoryId: '',
        isBought: false,
    });

    useEffect(() => {
        fetchMarkets().then(setMarkets);
        fetchCategories().then(setCategories);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createProduct({
                ...form,
                marketId: parseInt(form.marketId, 10),
                categoryId: parseInt(form.categoryId, 10),
            });
            alert('Ürün eklendi');
            setForm({ name: '', marketId: '', categoryId: '', isBought: false });
        } catch (err) {
            alert('Hata oluştu');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-4">
            <input
                type="text"
                placeholder="Ürün adı"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border"
                required
            />

            <select
                value={form.marketId}
                onChange={(e) => setForm({ ...form, marketId: e.target.value })}
                className="w-full p-2 border"
                required
            >
                <option value="">Market Seç</option>
                {markets.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>

            <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full p-2 border"
                required
            >
                <option value="">Kategori Seç</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={form.isBought}
                    onChange={(e) => setForm({ ...form, isBought: e.target.checked })}
                />
                <span>Alındı mı?</span>
            </label>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Ekle
            </button>
        </form>
    );
}