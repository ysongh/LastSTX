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

app.listen(PORT, () => {
  console.log(`🚀 Chainhook listener running on http://localhost:${PORT}`);
});