import { KiteConnect } from "kiteconnect";

const apiKey = "75y22";
const accessToken= "JPmFXo0Y1lokv5wWsuonT7ser08EsX07";

const kc = new KiteConnect({ api_key: apiKey });
// console.error(kc.getLoginURL()); // Commented out - this breaks MCP

export async function placeOrder(tradingsymbol:string,quantity:number,type:"BUY" | "SELL"){
    try{
        kc.setAccessToken(accessToken);
        const profile = await kc.placeOrder("regular",{
            exchange:"NSE",
            tradingsymbol:"HDFCBANK",
            transaction_type:"SELL",
            quantity:1,
            product:"CNC",
            order_type:"MARKET"
        });
    }
    catch(err){
        console.error("Order placement error:", err); // Added error logging
    }
}