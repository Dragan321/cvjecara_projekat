migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zavr2bpn",
    "name": "ukupnaCjena",
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
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // remove
  collection.schema.removeField("zavr2bpn")

  return dao.saveCollection(collection)
})
