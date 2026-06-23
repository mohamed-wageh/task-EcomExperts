import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'products.json');

function loadProductData() {
  const raw = readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

router.get('/steps', (req, res) => {
  try {
    const data = loadProductData();
    res.json(data);
  } catch (err) {
    console.error('Failed to load product data:', err.message);
    res.status(500).json({ error: 'Could not load product data.' });
  }
});

router.get('/products/:id', (req, res) => {
  try {
    const data = loadProductData();
    const productId = req.params.id;

    let found = null;
    for (const step of data.steps) {
      const match = step.products.find((p) => p.id === productId);
      if (match) {
        found = match;
        break;
      }
    }

    if (!found) {
      return res.status(404).json({ error: `Product "${productId}" not found.` });
    }

    res.json(found);
  } catch (err) {
    console.error('Failed to load product:', err.message);
    res.status(500).json({ error: 'Could not load product data.' });
  }
});

export default router;
