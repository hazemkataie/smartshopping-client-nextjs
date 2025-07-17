import ProductForm from './form';
import ProductList from './list';

export default function ProductPage() {
    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Ürün Ekle</h1>
            <ProductForm />
            <ProductList />
        </div>
    );
}
