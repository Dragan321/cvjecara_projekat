migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d73e3rqgg20wh66")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eg9cr2tb",
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
  const collection = dao.findCollectionByNameOrId("d73e3rqgg20wh66")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eg9cr2tb",
    "name": "field",
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
})
