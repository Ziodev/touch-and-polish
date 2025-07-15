import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductSelectorProps {
  selectedProduct: string;
  selectedVariant: string;
  onProductChange: (productId: string) => void;
  onVariantChange: (variantId: string) => void;
}

const mockProducts = [
  {
    id: 'prod1',
    name: 'Smartphone Pro Max',
    image: '/placeholder.svg?height=60&width=60',
    price: '$999.99',
    variants: [
      { id: 'var1', name: '128GB Negro', price: '$999.99' },
      { id: 'var2', name: '256GB Negro', price: '$1099.99' },
      { id: 'var3', name: '128GB Blanco', price: '$999.99' }
    ]
  },
  {
    id: 'prod2',
    name: 'Laptop Gaming Ultra',
    image: '/placeholder.svg?height=60&width=60',
    price: '$1599.99',
    variants: [
      { id: 'var4', name: '16GB RAM - RTX 4060', price: '$1599.99' },
      { id: 'var5', name: '32GB RAM - RTX 4070', price: '$1899.99' }
    ]
  },
  {
    id: 'prod3',
    name: 'Audífonos Inalámbricos',
    image: '/placeholder.svg?height=60&width=60',
    price: '$299.99',
    variants: [
      { id: 'var6', name: 'Negro', price: '$299.99' },
      { id: 'var7', name: 'Blanco', price: '$299.99' },
      { id: 'var8', name: 'Azul', price: '$319.99' }
    ]
  }
];

export function ProductSelector({ selectedProduct, selectedVariant, onProductChange, onVariantChange }: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProductData = mockProducts.find(p => p.id === selectedProduct);

  return (
    <div className="space-y-4">
      {/* Product Search */}
      <div className="space-y-2">
        <Label>Buscar producto</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Product Selection */}
      <div className="space-y-2">
        <Label>Producto</Label>
        <Select value={selectedProduct} onValueChange={(value) => {
          onProductChange(value);
          onVariantChange(''); // Reset variant when product changes
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un producto">
              {selectedProductData && (
                <div className="flex items-center space-x-2">
                  <img 
                    src={selectedProductData.image} 
                    alt={selectedProductData.name}
                    className="w-6 h-6 rounded"
                  />
                  <span>{selectedProductData.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {filteredProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.price}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Variant Selection */}
      {selectedProductData && (
        <div className="space-y-2">
          <Label>Variante</Label>
          <Select value={selectedVariant} onValueChange={onVariantChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una variante" />
            </SelectTrigger>
            <SelectContent>
              {selectedProductData.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{variant.name}</span>
                    <span className="text-muted-foreground ml-2">{variant.price}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selected Product Preview */}
      {selectedProductData && selectedVariant && (
        <div className="mt-4 p-3 bg-accent rounded-lg">
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">{selectedProductData.name}</div>
              <div className="text-sm text-muted-foreground">
                {selectedProductData.variants.find(v => v.id === selectedVariant)?.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}