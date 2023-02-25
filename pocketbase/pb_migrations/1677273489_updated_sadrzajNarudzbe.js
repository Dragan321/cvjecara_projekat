migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7o4beu2j",
    "name": "buket_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "bzni82iqvv1utz0",
      "cascadeDelete": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c2ehtlik",
    "name": "cvijet_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "d73e3rqgg20wh66",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq")

  // remove
  collection.schema.removeField("7o4beu2j")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c2ehtlik",
    "name": "cvijet_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "d73e3rqgg20wh66",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
