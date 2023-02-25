migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4wp8u4ts",
    "name": "temp",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // remove
  collection.schema.removeField("4wp8u4ts")

  return dao.saveCollection(collection)
})
