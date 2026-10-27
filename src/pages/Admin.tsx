import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Watch, CheckCircle2, ArrowLeft, UploadCloud, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/currency';
import type { Product } from '../types/product';

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<'Luxury' | 'Chronograph' | 'Minimalist' | 'Diving' | 'Classic'>('Luxury');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [description, setDescription] = useState('');
  const [caseSize, setCaseSize] = useState('41mm');
  const [movement, setMovement] = useState('Automatic Movement');
  const [waterResistance, setWaterResistance] = useState('50m / 5 ATM');
  const [strapMaterial, setStrapMaterial] = useState('316L Stainless Steel');

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getAll();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !price || !imageFile) {
      setErrorMsg('Please fill all required fields and choose a watch image.');
      return;
    }

    try {
      setUploading(true);
      setErrorMsg('');

      // 1. Upload photo to Supabase Storage Bucket 'watch-images'
      const publicImageUrl = await productService.uploadImage(imageFile);

      // 2. Insert watch record to Supabase Database 'products' table
      const newWatch: Product = {
        id: `kw-${Date.now().toString().slice(-6)}`,
        name,
        brand,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        category,
        image: publicImageUrl,
        gallery: [publicImageUrl],
        rating: 5.0,
        reviewsCount: 1,
        inStock: true,
        featured: true,
        description: description || 'Masterfully crafted luxury timepiece.',
        specs: {
          caseSize,
          movement,
          waterResistance,
          strapMaterial
        }
      };

      await productService.addProduct(newWatch);
      await loadProducts();

      // Reset Form
      setName('');
      setBrand('');
      setPrice('');
      setOriginalPrice('');
      setImageFile(null);
      setImagePreview('');
      setDescription('');

      setSuccessMsg('Watch and image successfully uploaded to Supabase!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error uploading to Supabase. Check bucket settings.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this watch?')) {
      try {
        await productService.deleteProduct(id);
        await loadProducts();
      } catch (err: any) {
        alert('Could not delete product: ' + err.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white mb-2 transition">
            <ArrowLeft size={14} /> Back to Storefront
          </Link>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Watch size={28} className="text-[#c5a880]" />
            Khpal Watch — Admin Studio
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Upload watches and high-resolution photos directly to Supabase Cloud Storage.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Upload Form */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-5 lg:col-span-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <PlusCircle size={20} className="text-[#c5a880]" />
            Upload New Watch
          </h2>

          <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Watch Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Oak Sovereign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Brand *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khpal Atelier"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Chronograph">Chronograph</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Diving">Diving</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 48500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Original Price (Strike)</label>
                <input
                  type="number"
                  placeholder="e.g. 55000"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            {/* Image File Picker */}
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Select Watch Photo from PC/Phone *</label>
              <div className="border border-dashed border-zinc-700 rounded-xl p-4 text-center bg-zinc-900/60 hover:border-[#c5a880] transition">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#c5a880] file:text-black hover:file:bg-[#d6b991] cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-3 aspect-square max-w-[150px] mx-auto rounded-lg overflow-hidden border border-zinc-700">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Movement</label>
                <input
                  type="text"
                  value={movement}
                  onChange={(e) => setMovement(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Case Diameter</label>
                <input
                  type="text"
                  value={caseSize}
                  onChange={(e) => setCaseSize(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Details about craftsmanship, dial finish..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3.5 bg-[#c5a880] text-black font-semibold rounded-xl hover:bg-[#d6b991] transition flex items-center justify-center gap-2 shadow-lg shadow-[#c5a880]/15 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Uploading to Supabase...
                </>
              ) : (
                <>
                  <UploadCloud size={16} />
                  Upload & Publish
                </>
              )}
            </button>
          </form>
        </div>

        {/* Existing Products Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Live Supabase Inventory ({products.length})</h2>
          </div>

          {loading ? (
            <div className="py-20 text-center text-zinc-500 text-sm">Fetching cloud inventory...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 text-zinc-400 space-y-2">
              <Watch size={36} className="mx-auto text-zinc-600 mb-2" />
              <h3 className="text-base font-semibold text-white">Database is completely empty</h3>
              <p className="text-xs text-zinc-500">All dummy watches removed. Use the form on the left to upload your first real watch!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#131317] border border-zinc-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-zinc-900 border border-zinc-800 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block">
                        {item.category} • {item.brand}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <span className="text-xs font-bold text-zinc-300">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition"
                    title="Delete product from Supabase"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
