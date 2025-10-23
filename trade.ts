import { KiteConnect } from "kiteconnect";
import "dotenv/config";

const apiKey = process.env.KITE_API_KEY!;
const accessToken = process.env.KITE_ACCESS_TOKEN!;

const kc = new KiteConnect({ api_key: apiKey });

/**
 * Place BUY/SELL order
 */
export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(accessToken);
    const order = await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET",
    });
    console.log(` ${type} order placed for ${quantity} of ${tradingsymbol}`);
    return order;
  } catch (err) {
    console.error(" Order placement error:", err);
    throw err;
  }
}

/**
 * Cancel an order by order_id
 */
export async function cancelOrder(order_id: string) {
  try {
    kc.setAccessToken(accessToken);
    const result = await kc.cancelOrder("regular", order_id);
    return `Order ${order_id} cancelled successfully.`;
  } catch (err) {
    console.error(" Cancel order error:", err);
    return ` Failed to cancel order ${order_id}.`;
  }
}

/**
 * Modify an order (quantity only for simplicity)
 */
export async function modifyOrder(order_id: string, quantity: number) {
  try {
    kc.setAccessToken(accessToken);
    const result = await kc.modifyOrder("regular", order_id, { quantity });
    return `Order ${order_id} modified to quantity ${quantity}.`;
  } catch (err) {
    console.error(" Modify order error:", err);
    return ` Failed to modify order ${order_id}.`;
  }
}

/**
 * Get all holdings
 */
export async function getHoldings() {
  try {
    kc.setAccessToken(accessToken);
    const holdings = await kc.getHoldings();
    if (!holdings.length) return "No holdings found.";
    return holdings
      .map(
        (h) =>
          `${h.tradingsymbol} — Qty: ${h.quantity}, Avg Price: ₹${h.average_price}, LTP: ₹${h.last_price}`
      )
      .join("\n");
  } catch (err) {
    console.error(" Holdings fetch error:", err);
    return "Failed to fetch holdings.";
  }
}

/**
 * Get positions
 */
export async function getPositions() {
  try {
    kc.setAccessToken(accessToken);
    const positions = await kc.getPositions();
    const all = [...positions.net];
    if (!all.length) return "No positions found.";
    return all
      .map(
        (p) =>
          `${p.tradingsymbol} — Qty: ${p.quantity}, P&L: ₹${p.pnl.toFixed(
            2
          )}, Buy Avg: ₹${p.buy_price}, LTP: ₹${p.last_price}`
      )
      .join("\n");
  } catch (err) {
    console.error(" Positions fetch error:", err);
    return "Failed to fetch positions.";
  }
}

/**
 * Get margin/balance
 */
export async function getMargins() {
  try {
    kc.setAccessToken(accessToken);
    const margins = await kc.getMargins();
    const cash = margins.equity?.available?.cash || 0;
    const used = margins.equity?.utilised?.debits || 0;
    return ` Cash Available: ₹${cash}\n Margin Used: ₹${used}`;
  } catch (err) {
    console.error(" Margin fetch error:", err);
    return "Failed to fetch margin.";
  }
}

/**
 * Get live stock quote
 */
export async function getQuote(stock: string) {
  try {
    kc.setAccessToken(accessToken);
    const symbol = `NSE:${stock.toUpperCase()}`;
    const data = await kc.getQuote([symbol]);
    const quote = data?.[symbol];
    if (!quote) return ` No quote found for ${stock}`;
    return ` ${stock.toUpperCase()} — LTP: ₹${quote.last_price}, O: ₹${quote.ohlc.open}, H: ₹${quote.ohlc.high}, L: ₹${quote.ohlc.low}`;
  } catch (err) {
    console.error(" Quote fetch error:", err);
    return ` Failed to fetch quote for ${stock}`;
  }
}

/**
 * Get all orders (order book)
 */
export async function getOrderBook() {
  try {
    kc.setAccessToken(accessToken);
    const orders = await kc.getOrders();
    if (!orders.length) return "No orders found.";
    return orders
      .map(
        (o) =>
          `OrderID: ${o.order_id}, ${o.tradingsymbol}, ${o.transaction_type}, Qty: ${o.quantity}, Status: ${o.status}`
      )
      .join("\n");
  } catch (err) {
    console.error(" Orders fetch error:", err);
    return "Failed to fetch order book.";
  }
}

/**
 * Get order history
 */
export async function getOrderHistory(tradingsymbol?: string) {
  try {
    kc.setAccessToken(accessToken);
    const orders = await kc.getOrders();
    let filtered = orders;
    if (tradingsymbol) {
      filtered = orders.filter((o) => o.tradingsymbol === tradingsymbol);
    }
    if (!filtered.length) return "No orders found.";
    return filtered
      .map(
        (o) =>
          `OrderID: ${o.order_id}, ${o.tradingsymbol}, ${o.transaction_type}, Qty: ${o.quantity}, Status: ${o.status}`
      )
      .join("\n");
  } catch (err) {
    console.error(" Order history fetch error:", err);
    return "Failed to fetch order history.";
  }
}

/**
 * Place a Stop Loss order (simple MARKET SL)
 */
export async function setStopLossOrder(tradingsymbol: string, quantity: number, trigger_price: number) {
  try {
    kc.setAccessToken(accessToken);
    const order = await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol,
      transaction_type: "SELL",
      quantity,
      product: "CNC",
      order_type: "SL",
      trigger_price,
    });
    return ` Stop Loss order placed for ${tradingsymbol} at ₹${trigger_price}`;
  } catch (err) {
    console.error(" Stop Loss order error:", err);
    return ` Failed to place Stop Loss for ${tradingsymbol}`;
  }
}
