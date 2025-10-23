Zerodha MCP Trading Server with Claude Frontend

A production-ready AI-powered trading assistant using Model Context Protocol (MCP) and Zerodha KiteConnect API, integrated with Claude AI for a smart frontend interface.

This project allows you to interact programmatically with your Zerodha account — place orders, fetch holdings, get live quotes, and manage positions — all controlled via Claude as the AI interface.

🚀 Features
Trading Tools

-Buy Stock – Place a market BUY order.

-Sell Stock – Place a market SELL order.

-Cancel Order – Cancel a pending order by order ID.

-Modify Order – Update the quantity of an existing order.

-Stop Loss Order – Place a stop-loss SELL order.

-Account Tools

-Get Holdings – Fetch all current holdings.

-Get Positions – Fetch all open positions.

-Get Balance – Check available cash and margin used.

-Get Order Book – View all live/pending orders.

-Get Order History – Fetch past orders.

-Get Quote – Fetch live stock price and OHLC info.

-Utility Tools

-Add – Simple addition tool for testing MCP setup.

🛠️ Technologies Used

-Node.js + TypeScript – Backend runtime and type safety.

-Zerodha KiteConnect API – For trading and market data.

-Model Context Protocol (MCP) – Modular tool-based architecture.

-Claude AI – Frontend interface for smart AI-based trading commands.

-Zod – Runtime validation for tool inputs.

-dotenv – Secure environment variable management.

⚡ Installation

Clone the repository:

1.git clone https://github.com/<your-username>/zerodha-mcp.git
2.cd zerodha-mcp


3.Install dependencies:

npm install


4.Create a .env file and add your Zerodha credentials:

KITE_API_KEY=your_api_key
KITE_ACCESS_TOKEN=your_access_token


5.Run the MCP server:

npx ts-node server.ts


📝 Usage with Claude Frontend

Claude AI acts as your frontend agent to call MCP tools. Example commands you can give Claude:

- Show my current holdings.
- Buy 5 shares of HDFCBANK.
- Sell 2 shares of INFY.
- Fetch the live quote of TCS.
- Place a stop-loss order for RELIANCE at 2400 for 3 shares.


Claude will use the MCP server tools automatically and return structured responses.

📂 Project Structure
zerodha-mcp/
│
├─ server.ts          # MCP server with all tools
├─ trade.ts           # Zerodha trading functions
├─ package.json
├─ tsconfig.json
├─ .env               # Environment variables
└─ README.md

💡 Future Enhancements

-Add dashboard UI for live monitoring (optional if using Claude).

-Integrate automated trading strategies or triggers.

-Add Telegram/email notifications for trade updates.

-Support multi-user trading with authentication.

-Fetch top gainers/losers for trading signals.

⚠️ Notes

-Use a demo/paper trading account for testing to avoid real money risk.

-Secure your API keys; never commit .env to GitHub.

-Claude AI integration allows intelligent decision-making using your MCP server tools.

📄 License

This project is licensed under MIT License.