migrate((db) => {
  const collection = new Collection({
    "id": "d73e3rqgg20wh66",
    "created": "2023-02-06 17:44:19.215Z",
    "updated": "2023-02-06 17:44:19.215Z",
    "name": "cvjet",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hjjopthf",
        "name": "naziv",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tv0icdws",
        "name": "kolicina",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "5n88qeje",
        "name": "cijena",
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
        "id": "rscccuxo",
        "name": "opis",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("d73e3rqgg20wh66");

  return dao.deleteCollection(collection);
})
