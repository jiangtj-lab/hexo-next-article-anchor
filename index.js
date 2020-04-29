/* global hexo */

'use strict';

const { join } = require("path");
const cheerio = require("cheerio");
const injector = require("hexo-extend-injector2")(hexo);

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

injector.register('style', join(__dirname, 'article-anchor.styl'));
