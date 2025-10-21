import { KiteConnect } from "kiteconnect";

const apiKey = "75y22u3kl0bjnvt2";
const accessToken= "hwn1a57C7pW0bWBMcAV1OEwVg2QxMWJv";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());

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
            console.log(err);
        }
    }
    
