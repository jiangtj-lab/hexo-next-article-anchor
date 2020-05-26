/* global hexo */

'use strict';

const { join } = require("path");
const cheerio = require("cheerio");
const injector = require("hexo-extend-injector2")(hexo);

hexo.extend.filter.register('marked:renderer', function(renderer) {
  let originalRender = renderer.heading;
  renderer.heading = (...args) => {
    let level = args[1];
    let content = originalRender.apply(renderer, args);
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
