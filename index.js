/* global hexo */

'use strict';

const path = require("path");
const cheerio = require("cheerio");

hexo.extend.filter.register('marked:renderer', function(renderer) {
  let originalRender = new renderer.constructor();
  renderer.heading = (text, level) => {
    let content = originalRender.heading(text, level);
    let $ = cheerio.load(content, { decodeEntities: false });
    let el = $(`h${level}`);
    var id = el.attr('id');
    el
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
    return $.html();
  };
});

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.style.push(path.join(__dirname, 'article-anchor.styl'));
});
