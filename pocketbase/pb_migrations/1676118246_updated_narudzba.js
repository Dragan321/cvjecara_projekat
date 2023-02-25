migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qrcp4o1i",
    "name": "cijena",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // remove
  collection.schema.removeField("qrcp4o1i")

  return dao.saveCollection(collection)
})
