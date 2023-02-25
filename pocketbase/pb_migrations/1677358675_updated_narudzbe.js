migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // remove
  collection.schema.removeField("vvw8mfxc")

  return dao.saveCollection(collection)
}, (db) => {
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
      "collectionId": "hnworc4ss7jtnmq",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
