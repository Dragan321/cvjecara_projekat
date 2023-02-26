migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9jkmcpx",
    "name": "sadrzajNarudzbe_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hnworc4ss7jtnmq",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9jkmcpx",
    "name": "sadrzajNarudzbe_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hnworc4ss7jtnmq",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id",
        "narudzbe_id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
