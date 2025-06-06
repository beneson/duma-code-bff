import express from 'express';
import integrationsRouter from './integrationsRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.BFF_PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/api', integrationsRouter);

app.listen(PORT, () => {
  console.log(`BFF server running on port ${PORT}`);
});
