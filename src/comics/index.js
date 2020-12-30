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
  const titleDOM = fullTitle.querySelector('span');
  const title = titleDOM ? normalize(titleDOM.innerText) : undefined;

  const itemNumberDOM = fullTitle.querySelector('strong');
  const itemNumber = itemNumberDOM ? +normalize(itemNumberDOM.innerText).replace('#', '') : undefined;

  const descriptionDOM = html.querySelectorAll('div.wiki-content div p');
  const description = descriptionDOM.length ? [...descriptionDOM].map((i) => normalize(i.innerText)).join(' - ') : undefined;

  const rawAuthorsDOM = html.querySelectorAll('div.authors.info-item p a');
  const authors = rawAuthorsDOM.length ? [...rawAuthorsDOM].map((i) => normalize(i.innerText)) : [];

  const coverDOM = html.querySelector('div.b-info p.comic-cover a.fancybox');
  const cover = coverDOM ? coverDOM.rawAttributes.href : undefined;

  const publishedDateDOM = html.querySelector('div.info div div p');
  const publishedDate = publishedDateDOM ? publishedDateDOM.rawAttributes.content : undefined;

  const ratingDOM = html.querySelector('span.stars span.stars-bg span.stars-value');
  const rating = ratingDOM ? +normalize(ratingDOM.innerText) : undefined;

  const [, rawLanguageDOM, rawPublisherDOM] = html.querySelectorAll('p.lang-pub span');

  const language = rawLanguageDOM ? normalize(rawLanguageDOM.innerText) : undefined;
  const publisher = rawPublisherDOM ? normalize(rawPublisherDOM.innerText) : undefined;

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
