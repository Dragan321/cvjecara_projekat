migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btghe0sgfy094qk")

  // remove
  collection.schema.removeField("jrq4jux6")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btghe0sgfy094qk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jrq4jux6",
    "name": "id_buketa",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
