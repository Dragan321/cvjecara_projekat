migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7o4beu2j",
    "name": "buket_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7o4beu2j",
    "name": "buket_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
