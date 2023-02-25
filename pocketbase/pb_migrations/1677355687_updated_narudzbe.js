migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvw8mfxc",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "hnworc4ss7jtnmq",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // remove
  collection.schema.removeField("vvw8mfxc")

  return dao.saveCollection(collection)
})
