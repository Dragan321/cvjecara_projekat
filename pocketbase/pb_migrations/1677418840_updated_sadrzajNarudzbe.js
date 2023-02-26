migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // remove
  collection.schema.removeField("nv86ssp0")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nv86ssp0",
    "name": "narudzbe_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "rbfk8vc3y7k1m9b",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
