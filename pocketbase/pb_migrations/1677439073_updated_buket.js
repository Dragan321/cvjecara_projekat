migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azvfm5xv",
    "name": "naziv",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azvfm5xv",
    "name": "nazivBuketa",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
