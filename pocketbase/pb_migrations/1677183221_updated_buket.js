migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2vz3uxf",
    "name": "slika",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // remove
  collection.schema.removeField("w2vz3uxf")

  return dao.saveCollection(collection)
})
