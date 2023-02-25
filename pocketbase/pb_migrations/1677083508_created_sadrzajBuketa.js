migrate((db) => {
  const collection = new Collection({
    "id": "btghe0sgfy094qk",
    "created": "2023-02-22 16:31:48.570Z",
    "updated": "2023-02-22 16:31:48.570Z",
    "name": "sadrzajBuketa",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "1cbglh20",
        "name": "id_cvijeta",
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
        "id": "xzmtk4wp",
        "name": "kolicina",
        "type": "number",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("btghe0sgfy094qk");

  return dao.deleteCollection(collection);
})
