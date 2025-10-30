import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: any[] = [];

  /**
   * Devuelve los ítems en el carrito.
   */
  getItems(): any[] {
    return this.items;
  }

  /**
   * Añade un producto al carrito. Si ya existe, incrementa la cantidad.
   */
  addItem(product: any): void {
    const existing = this.items.find(i => i.producto_id === product.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      this.items.push({ producto_id: product.id, nombre: product.nombre, precio: product.precio, cantidad: 1 });
    }
  }

  /**
   * Elimina un ítem del carrito.
   */
  removeItem(item: any): void {
    this.items = this.items.filter(i => i.producto_id !== item.producto_id);
  }

  /**
   * Vacía el carrito.
   */
  clear(): void {
    this.items = [];
  }
}