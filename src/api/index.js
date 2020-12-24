const express = require('express');
const axios = require('axios').default;
const { parse } = require('node-html-parser');

const router = express.Router();

const URL = 'https://www.whakoom.com/pwkws.asmx/QuickView';

function normalize(input) {
  return input
    .replace('\r', '')
    .replace('\t', '')
    .replace('\n', '')
    .replace('&nbsp;', '')
    .trim();
}

function parseDom(rawHtml) {
  const html = parse(rawHtml);
  const fullTitle = html.querySelector('div.b-info h1');
  const title = normalize(fullTitle.querySelector('span').innerText);
  const number = normalize(fullTitle.querySelector('strong').innerText.replace('#', ''));

  const description = normalize(html.querySelector('div.wiki-content div p').innerText);
  const authors = normalize(html.querySelector('div.authors.info-item p').innerText);
  return {
    title,
    number,
    description,
    authors,
  };
}

router.get('/comic/:id', async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const { data } = await axios.post(URL, { cid: `comic${id}` });
      try {
        const html = parseDom(data.d.Html);
        res.json(html);
      } catch (error) {
        next(new Error('Error parsing data'));
      }
    } catch (error) {
      next(new Error('Wrong comic ID'));
    }
  }
});

module.exports = router;
