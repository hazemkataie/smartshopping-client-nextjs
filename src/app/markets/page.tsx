'use client';

import { useEffect, useState } from "react";

type Market = {
  id: number;
  name: string;
  address: string;
};

export default function MarketListPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Veri çekme
  const fetchMarkets = async () => {
    try {
      const res = await fetch("http://localhost:4000/markets");
      const data = await res.json();
      setMarkets(data);
    } catch (err) {
      console.error("Veriler alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    try {
      const res = await fetch("http://localhost:4000/markets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address }),
      });

      if (res.ok) {
        setName('');
        setAddress('');
        fetchMarkets(); // Listeyi güncelle
      }
    } catch (err) {
      console.error("Market eklenemedi:", err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Market Listesi</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium">Market Adı</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Kaufland"
          />
        </div>
        <div>
          <label className="block font-medium">Adres</label>
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Örn: Berlin - Alexanderplatz 1"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Market Ekle
        </button>
      </form>

      {/* Liste */}
      <ul className="space-y-2">
        {markets.map((market) => (
          <li key={market.id} className="border p-2 rounded shadow">
            <strong>{market.name}</strong> — {market.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
