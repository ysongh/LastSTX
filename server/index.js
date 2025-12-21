import { ChainhooksClient, CHAINHOOKS_BASE_URL } from '@hirosystems/chainhooks-client';
import express from "express";
import { config as loadEnv } from 'dotenv';

loadEnv();

const app = express();
app.use(express.json());

const PORT = 4000;

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.testnet,
  apiKey: process.env.HIRO_API_KEY,
});

app.get("/test", async (req, res) => {
  // Get first page (default: 20 results)
  const chainhooks = await client.getChainhooks();

  console.log('Total chainhooks:', chainhooks.total);
  console.log('Results:', chainhooks.results.length);
  console.log('Limit:', chainhooks.limit);
  console.log('Offset:', chainhooks.offset);
});

// Endpoint to receive chainhook events
app.post("/chainhook-events", (req, res) => {
  const payload = req.body;
  
  console.log("🔔 New event received!");
  console.log("Event type:", payload.apply);
  
  payload.apply.forEach((event) => {
    // Extract transaction details
    const txId = event.transaction_identifier.hash;
    const blockHeight = event.block_identifier.index;
    
    // Process contract call events
    event.transactions.forEach((tx) => {
      const sender = tx.metadata.sender;
      const contractCall = tx.metadata.receipt.contract_calls_stack[0];
      
      if (contractCall && contractCall.function_name === "increment") {
        const eventData = {
          txId,
          blockHeight,
          sender,
          timestamp: new Date().toISOString(),
          function: contractCall.function_name,
          result: contractCall.result
        };
        
        recentEvents.push(eventData);
        
        console.log(`
╔════════════════════════════════════════════════╗
║        🎉 INCREMENT EVENT DETECTED!            ║
╠════════════════════════════════════════════════╣
║ Block Height: ${blockHeight}
║ Sender: ${sender}
║ Transaction: ${txId}
║ Function: ${contractCall.function_name}
║ Result: ${contractCall.result}
╚════════════════════════════════════════════════╝
        `);
      }
    });
  });
  
  res.status(200).json({ success: true });
});


app.listen(PORT, () => {
  console.log(`🚀 Chainhook listener running on http://localhost:${PORT}`);
});