migrate((db) => {
  const collection = new Collection({
    "id": "hnworc4ss7jtnmq",
    "created": "2023-02-11 11:56:49.005Z",
    "updated": "2023-02-11 11:56:49.005Z",
    "name": "narudzba",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nv86ssp0",
        "name": "narudzbe_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "rbfk8vc3y7k1m9b",
          "cascadeDelete": false
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "hj6rcthq",
        "name": "kolicina_cvjeta",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hnworc4ss7jtnmq");

  return dao.deleteCollection(collection);
})
