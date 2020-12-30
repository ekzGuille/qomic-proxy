const express = require('express');
const axios = require('axios').default;
const { parse } = require('node-html-parser');

const router = express.Router();

const URL = 'https://www.whakoom.com/pwkws.asmx/QuickView';

function normalize(input) {
  return input ? input
    .replace(/(\\r)|(\\t)|(\\n)|(&nbsp;)/g, '')
    .trim() : '';
}

function parseDom(rawHtml) {
  const html = parse(rawHtml);

  const fullTitle = html.querySelector('div.b-info h1');
  const title = normalize(fullTitle.querySelector('span').innerText);
  const itemNumber = +normalize(fullTitle.querySelector('strong').innerText).replace('#', '');

  const description = normalize(html.querySelector('div.wiki-content div p').innerText);

  const rawAuthors = normalize(html.querySelector('div.authors.info-item p').innerText);
  const authors = (rawAuthors.split(',') || []).map((item) => item.trim());

  const cover = html.querySelector('div.b-info p.comic-cover a.fancybox').rawAttributes.href || '';
  const publishedDate = html.querySelector('div.info div div p').rawAttributes.content;
  const rating = +normalize(html.querySelector('span.stars span.stars-bg span.stars-value').innerText);

  const [, rawLanguage, rawPublisher] = html.querySelectorAll('p.lang-pub span');
  const language = normalize(rawLanguage.innerText);
  const publisher = normalize(rawPublisher.innerText);
  return {
    title,
    item_number: itemNumber,
    description,
    authors,
    cover,
    published_date: publishedDate,
    rating,
    language,
    publisher
  };
}

router.get('/:id', async (req, res, next) => {
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
