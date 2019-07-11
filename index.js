/* global hexo */

'use strict';

const path = require("path");

hexo.extend.filter.register('after_post_render', function (data) {

  var cheerio;
  if (!cheerio) cheerio = require('cheerio');
  var $ = cheerio.load(data.content, { decodeEntities: false });

  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return;

  headings.each(function() {
    var id = $(this).attr('id');
    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });
  
  data.content = $.html();

});

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.variable.push(path.join(__dirname, 'article-anchor.styl'));
});
