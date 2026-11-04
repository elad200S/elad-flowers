import { neon } from "@neondatabase/serverless";

export interface OrderItem {
  title: string;
  image: string;
  sizeLabel: string;
  quantity: number;
  basePrice: number;
  addOns: { label: string; price: number }[];
}

export interface Order {
  id: number;
  created_at: string;
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  recipient_name: string;
  recipient_phone: string;
  city: string;
  street: string;
  floor: string | null;
  delivery_date: string;
  rush_delivery: boolean;
  card_message: string | null;
  payment_method: string;
  items: OrderItem[];
  delivery_cost: number;
  total: number;
  fulfilled: boolean;
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(process.env.DATABASE_URL);
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      sender_name TEXT NOT NULL,
      sender_phone TEXT NOT NULL,
      sender_email TEXT NOT NULL DEFAULT '',
      recipient_name TEXT NOT NULL,
      recipient_phone TEXT NOT NULL,
      city TEXT NOT NULL,
      street TEXT NOT NULL,
      floor TEXT,
      delivery_date DATE NOT NULL,
      rush_delivery BOOLEAN NOT NULL DEFAULT false,
      card_message TEXT,
      payment_method TEXT NOT NULL,
      items JSONB NOT NULL,
      delivery_cost INTEGER NOT NULL,
      total INTEGER NOT NULL,
      fulfilled BOOLEAN NOT NULL DEFAULT false
    )
  `;
  // Table may already exist from before this column was added.
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS sender_email TEXT NOT NULL DEFAULT ''`;
}

function withSchema<T>(fn: () => Promise<T>): Promise<T> {
  if (!schemaReady) schemaReady = ensureSchema();
  return schemaReady.then(fn);
}

export interface NewOrder {
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientPhone: string;
  city: string;
  street: string;
  floor: string;
  deliveryDate: string;
  rushDelivery: boolean;
  cardMessage: string;
  paymentMethod: string;
  items: OrderItem[];
  deliveryCost: number;
  total: number;
}

export async function createOrder(order: NewOrder): Promise<Order> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO orders (
        sender_name, sender_phone, sender_email, recipient_name, recipient_phone,
        city, street, floor, delivery_date, rush_delivery, card_message,
        payment_method, items, delivery_cost, total
      ) VALUES (
        ${order.senderName}, ${order.senderPhone}, ${order.senderEmail}, ${order.recipientName}, ${order.recipientPhone},
        ${order.city}, ${order.street}, ${order.floor || null}, ${order.deliveryDate}, ${order.rushDelivery}, ${order.cardMessage || null},
        ${order.paymentMethod}, ${JSON.stringify(order.items)}, ${order.deliveryCost}, ${order.total}
      )
      RETURNING *
    `;
    return rows[0] as Order;
  });
}

export async function listOrders(): Promise<Order[]> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return rows as Order[];
  });
}

export async function getOrder(id: number): Promise<Order | null> {
  return withSchema(async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM orders WHERE id = ${id}`;
    return (rows[0] as Order) ?? null;
  });
}

export async function setOrderFulfilled(id: number, fulfilled: boolean): Promise<void> {
  return withSchema(async () => {
    const sql = getSql();
    await sql`UPDATE orders SET fulfilled = ${fulfilled} WHERE id = ${id}`;
  });
}
