import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio'; // ✅ Fixed version

const router = express.Router();

router.post('/scrape-pdfs', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = [];

    $('a[href$=".pdf"]').each((_, el) => {
      let link = $(el).attr('href');
      if (link && !link.startsWith('http')) {
        const base = new URL(url);
        link = new URL(link, base).href;
      }
      links.push(link);
    });

    res.json({ links });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape PDF links' });
  }
});

export default router;