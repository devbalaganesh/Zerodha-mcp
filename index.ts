import {
  placeOrder,
  getHoldings,
  getPositions,
  getMargins,
  getQuote,
  cancelOrder,
  modifyOrder,
  getOrderBook,
  getOrderHistory,
  setStopLossOrder,
} from "./trade.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "Zerodha-MCP", version: "1.0.0" });

// ---------------- Tools ----------------

// Add
server.tool("add", "Adds two numbers.", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: "text", text: `Result: ${a + b}` }],
}));

// Buy
server.tool(
  "buy_stock",
  "Place a BUY order.",
  { stock: z.string(), qty: z.number().int().positive() },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "BUY");
    return { content: [{ type: "text", text: ` Buy order placed for ${qty} of ${stock}` }] };
  }
);

// Sell
server.tool(
  "sell_stock",
  "Place a SELL order.",
  { stock: z.string(), qty: z.number().int().positive() },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "SELL");
    return { content: [{ type: "text", text: ` Sell order placed for ${qty} of ${stock}` }] };
  }
);

// Holdings
server.tool("get_holdings", "Fetch user's holdings.", {}, async () => {
  const holdings = await getHoldings();
  return { content: [{ type: "text", text: holdings }] };
});

// Positions
server.tool("get_positions", "Fetch user's positions.", {}, async () => {
  const positions = await getPositions();
  return { content: [{ type: "text", text: positions }] };
});

// Balance / Margins
server.tool("get_balance", "Fetch margin/balance info.", {}, async () => {
  const balance = await getMargins();
  return { content: [{ type: "text", text: balance }] };
});

// Quote
server.tool("get_quote", "Fetch live stock quote.", { stock: z.string() }, async ({ stock }) => {
  const quote = await getQuote(stock);
  return { content: [{ type: "text", text: quote }] };
});

// Cancel Order
server.tool(
  "cancel_order",
  "Cancel an existing order by order_id.",
  { order_id: z.string() },
  async ({ order_id }) => {
    const result = await cancelOrder(order_id);
    return { content: [{ type: "text", text: result }] };
  }
);

// Modify Order
server.tool(
  "modify_order",
  "Modify an existing order's quantity.",
  { order_id: z.string(), qty: z.number().int().positive() },
  async ({ order_id, qty }) => {
    const result = await modifyOrder(order_id, qty);
    return { content: [{ type: "text", text: result }] };
  }
);

// Get Order Book
server.tool("get_order_book", "Fetch all pending orders.", {}, async () => {
  const orders = await getOrderBook();
  return { content: [{ type: "text", text: orders }] };
});

// Get Order History
server.tool(
  "get_order_history",
  "Fetch all past orders, optional filter by stock.",
  { stock: z.string().optional() },
  async ({ stock }) => {
    const history = await getOrderHistory(stock);
    return { content: [{ type: "text", text: history }] };
  }
);

// Stop Loss Order
server.tool(
  "set_stoploss_order",
  "Place a Stop Loss order for a stock.",
  { stock: z.string(), qty: z.number().int().positive(), trigger_price: z.number().positive() },
  async ({ stock, qty, trigger_price }) => {
    const result = await setStopLossOrder(stock, qty, trigger_price);
    return { content: [{ type: "text", text: result }] };
  }
);

// 
const transport = new StdioServerTransport();
await server.connect(transport);


