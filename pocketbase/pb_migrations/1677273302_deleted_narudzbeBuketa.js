migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ocxq6oorj3rlwvo");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ocxq6oorj3rlwvo",
    "created": "2023-02-24 20:54:51.925Z",
    "updated": "2023-02-24 20:54:51.925Z",
    "name": "narudzbeBuketa",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zyrdfoqq",
        "name": "narudzbe_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "rbfk8vc3y7k1m9b",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "hqyxhuva",
        "name": "buket_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "bzni82iqvv1utz0",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "wu2lfqdy",
        "name": "kolicina",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "gndyn2yy",
        "name": "cijena",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
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
})
