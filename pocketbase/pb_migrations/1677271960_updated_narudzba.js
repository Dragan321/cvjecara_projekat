migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  collection.name = "narudzbeCvjeca"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  collection.name = "narudzba"

  return dao.saveCollection(collection)
})
