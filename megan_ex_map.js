var fs = require('fs');
var csvjson = require('csvjson');
// var tops = fs.readFileSync('/Users/meganmartinson/Desktop/top_thou_tops.csv').toString();
var tops = fs.readFileSync('/Users/katherinevogel/Desktop/tops.csv').toString();
var tags = fs.readFileSync('/Users/katherinevogel/Desktop/taxons.csv').toString();
var options = {
 delimiter: ','
};
var options2 = {
 delimiter: '|'
};
var tagsj = csvjson.toObject(tags, options);
var topsj = csvjson.toObject(tops, options2);
// var tops = JSON.parse(fs.readFileSync('/Users/meganmartinson/Downloads/tops_no_hex.json').toString());
// var tags = JSON.parse(fs.readFileSync('**insertjsonhere**').toString());

topsj.forEach(function (file) {
       file.title = file.name;
       delete file.name;

       file.price = file.listprice;
       delete file.listprice;

       file.requiresShipping = true;
       // FOR ALL METAFIELD DATA
       file.metafields = {};

       file.metafields.style = file.style;
       delete file.style;

       // FOR ALL HASHTAG DATA
       file.hashtags = {}
       if (file.meganpick == 'Y') {
         file.hashtags.push('**INSERT ID HERE**')
       };
       if (file.exclusive == 'Y') {
         file.hashtags.push('**INSERT ID HERE**');
       };
       if (file.finds == 'Y') {
         file.hashtags.push('**INSERT ID HERE**');
       };
       if (file.justin == 'Y') {
         file.hashtags.push('**INSERT ID HERE**');
       };
       if (file.topseller == 'Y') {
         file.hashtags.push('**INSERT ID HERE**');
       };
       file.vendor = file.brand;
       file.hashtags.push(file.vendor);
       delete file.brand;
       file.isVisible = true;
       file.hashtags.push(file.dept);
       file.hashtags.push(file.inventorytype);
   };


   /// UPDATING OUR TAXO STRUCTURE TO TAG structure

   tagsj.forEach(tag) {
     tags.slug = (tag.name.split(' ').concat('-'));
     delete tag.id, tag.parentId, tag.permalink, tag.taxonomy_id, tag.lft, tag.rgt, tag.icon_file_name, tag.icon_content_type,
       tag.icon_file_size, tag.icon_updated_at, tag.description, tag.meta_title, tag.meta_description, tag.meta_keyworkds,
       tag.depth;
   };
