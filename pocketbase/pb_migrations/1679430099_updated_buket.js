migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vezooupq",
    "name": "sadrzajBuketa_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "btghe0sgfy094qk",
      "cascadeDelete": true,
      "maxSelect": null,
      "displayFields": [
        "kolicina",
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vezooupq",
    "name": "sadrzajBuketa_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "btghe0sgfy094qk",
      "cascadeDelete": true,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
