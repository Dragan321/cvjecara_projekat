migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hj6rcthq",
    "name": "kolicina_cvjeta",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hj6rcthq",
    "name": "kolicina_cvjeta",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
