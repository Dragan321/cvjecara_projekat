migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d73e3rqgg20wh66")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsrdgbbj",
    "name": "kolicinaUKartu",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d73e3rqgg20wh66")

  // remove
  collection.schema.removeField("fsrdgbbj")

  return dao.saveCollection(collection)
})
