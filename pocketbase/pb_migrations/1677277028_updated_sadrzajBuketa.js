migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btghe0sgfy094qk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jrq4jux6",
    "name": "id_buketa",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btghe0sgfy094qk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jrq4jux6",
    "name": "id_buketa",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
