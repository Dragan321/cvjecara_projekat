migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hxpeh1u",
    "name": "sadrzajNarudzbe_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "hnworc4ss7jtnmq",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // remove
  collection.schema.removeField("5hxpeh1u")

  return dao.saveCollection(collection)
})
