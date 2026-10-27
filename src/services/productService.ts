import { supabase } from './supabaseClient';
import type { Product } from '../types/product';

const mapFromDb = (row: any): Product => ({
  id: row.id,
  name: row.name,
  brand: row.brand,
  price: Number(row.price),
  originalPrice: row.original_price ? Number(row.original_price) : undefined,
  category: row.category,
  image: row.image,
  gallery: row.gallery && row.gallery.length > 0 ? row.gallery : [row.image],
  rating: Number(row.rating || 5.0),
  reviewsCount: Number(row.reviews_count || 1),
  inStock: Boolean(row.in_stock),
  featured: Boolean(row.featured),
  description: row.description || '',
  specs: {
    caseSize: row.case_size || '41mm',
    movement: row.movement || 'Automatic Movement',
    waterResistance: row.water_resistance || '50m / 5 ATM',
    strapMaterial: row.strap_material || '316L Stainless Steel'
  }
});

export const productService = {
  // Real File Upload to Supabase Storage bucket 'watch-images'
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('watch-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('watch-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async getAll(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        return [];
      }
      return data.map(mapFromDb);
    } catch {
      return [];
    }
  },

  async getFeatured(): Promise<Product[]> {
    const all = await this.getAll();
    return all.filter((p) => p.featured);
  },

  async getById(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) return null;
      return mapFromDb(data);
    } catch {
      return null;
    }
  },

  async getByCategory(category: string): Promise<Product[]> {
    const all = await this.getAll();
    if (category.toLowerCase() === 'all') {
      return all;
    }
    return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  },

  async addProduct(product: Product): Promise<Product> {
    const dbPayload = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      original_price: product.originalPrice || null,
      category: product.category,
      image: product.image,
      gallery: product.gallery,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      in_stock: product.inStock,
      featured: product.featured || false,
      description: product.description,
      case_size: product.specs.caseSize,
      movement: product.specs.movement,
      water_resistance: product.specs.waterResistance,
      strap_material: product.specs.strapMaterial
    };

    const { error } = await supabase.from('products').insert([dbPayload]);
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    return product;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }
  }
};
