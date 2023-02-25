migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
