'use client';

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:4000/category');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Kategoriler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    try {
      const res = await fetch('http://localhost:4000/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName('');
        fetchCategories();
      }
    } catch (err) {
      console.error('Kategori eklenemedi:', err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kategoriler</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium">Kategori Adı</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Süt Ürünleri"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Kategori Ekle
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-2 rounded shadow">
            {cat.name} <span className="text-sm text-gray-500">({new Date(cat.createdAt).toLocaleDateString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
