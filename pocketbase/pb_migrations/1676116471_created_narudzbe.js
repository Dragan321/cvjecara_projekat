migrate((db) => {
  const collection = new Collection({
    "id": "rbfk8vc3y7k1m9b",
    "created": "2023-02-11 11:54:31.242Z",
    "updated": "2023-02-11 11:54:31.242Z",
    "name": "narudzbe",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tlozo3ip",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "iegcpexy",
        "name": "oreder_status",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "preuzeta",
            "istekla",
            "cekanje na preuzimanje"
          ]
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
  const collection = dao.findCollectionByNameOrId("rbfk8vc3y7k1m9b");

  return dao.deleteCollection(collection);
})
