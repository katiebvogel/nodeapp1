This is a sandbox repo for working with node apps.  Mostly for interacting with mongo and/or SQL db's.

template2.js is an example of transforming csv to json and then BASIC mapping over of celerant fields into Reaction key/value pairs.
I used JSONpath and jsonpath-object-transform.

There is also another package that works with lodash.  
node-json-transform.

10/26/16
mongoimport -h localhost:3001 --db meteor --collection Prod
ucts --file /Users/katherinevogel/Codespace/reaction/custom/fileProducts.json

^^run from terminal in reaction directory to bypass meteorImport process.




10/29/16 -- Working on reading, parsing files synchronously.  fs-sync or fs-wait?  (look in template2.js, Katie) fs-then. 
