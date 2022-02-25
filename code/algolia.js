var dotenv = require("dotenv").config()

var algoliaSearch = require("algoliasearch")
var calculateOperations = require("atomic-algolia/lib/utils/calculateOperations")
var getLocalIndex = require("atomic-algolia/lib/utils/getLocalIndex")

var actionAdd = require("atomic-algolia/lib/utils/actionAdd")
var actionUpdate = require("atomic-algolia/lib/utils/actionUpdate")
var actionDelete = require("atomic-algolia/lib/utils/actionDelete")
var chalk = require("chalk")

var title = "[" + chalk.blue("Algolia") + "]"

var indexName = process.env.ALGOLIA_INDEX_NAME
var indexData = process.env.ALGOLIA_INDEX_FILE

var client = algoliaSearch(
            process.env.ALGOLIA_APP_ID,
            process.env.ALGOLIA_ADMIN_KEY
        )
        
var index = client.initIndex(indexName)
var newIndex = getLocalIndex(indexData)



async function  getRemoteIndex(index) {
  let hits = [];
  await index.browseObjects({
    query: '', // Empty query will match all records
    batch: batch => {
      hits = hits.concat(batch);
    },
    attributesToRetrieve: ["*"]
  })
  return hits
}


function myerror (err, result) {
        if (err) throw err
        console.log(result)
}
    
    
async function update(indexName, indexData) {
  if (!indexName)
        throw new Error("Please provide `indexName`")

  if (!indexData)
        throw new Error("Please provide `indexData`. A valid Javacript object or path to a JSON file.")

  var client = algoliaSearch(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_ADMIN_KEY
  )

  var index = client.initIndex(indexName)
  var newIndex = getLocalIndex(indexData)

  return getRemoteIndex(index)
   .then(function(oldIndex) {
    // Figure out which records to add or delete
    var operations = calculateOperations(newIndex, oldIndex)

    console.log(title, `Adding ${operations.add.length} hits to ${indexName}`)
    console.log(title, `Updating ${operations.update.length} hits to ${indexName}`)
    console.log(title, `Removing ${operations.delete.length} hits from ${indexName}`)
    console.log(title, `${operations.ignore.length} hits unchanged in ${indexName}`)

    // Fetch full records from operation ids
    var toAddRecords = newIndex.filter(function(hit) {
        return operations.add.indexOf(hit.objectID) !== -1
    })

    var toUpdateRecords = newIndex.filter(function(hit) {
        return operations.update.indexOf(hit.objectID) !== -1
    })

    // Create batch update actions
    var toAdd = toAddRecords.map(function(record) {
        return actionAdd(record, indexName)
    })

    var toUpdate = toUpdateRecords.map(function(record) {
        return actionUpdate(record, indexName)
    })

    var toDelete = operations.delete.map(function(id) {
        return actionDelete(id, indexName)
    })
    
    var batchActions = [].concat(toAdd, toUpdate, toDelete)


    var result = {}; 
    
    // Perform the batch API call
    if (batchActions.length > 0) {
        // Notify client this is coming from this script
        client.setExtraHeader("X-FORWARDED-BY", "MY-ATOMIC-ALGOLIA")
        
        client.batch(batchActions, function(err, res) {
            if (err) throw err
            result = res
        })
    }
    return result;
   })
}


 update(indexName, indexData)
   .then(console.log)