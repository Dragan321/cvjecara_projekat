migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iegcpexy",
    "name": "order_status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "preuzeta",
        "istekla",
        "cekanje na preuzimanje"
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
    "id": "iegcpexy",
    "name": "oreder_status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "preuzeta",
        "istekla",
        "cekanje na preuzimanje"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
