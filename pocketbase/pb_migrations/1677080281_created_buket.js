migrate((db) => {
  const collection = new Collection({
    "id": "bzni82iqvv1utz0",
    "created": "2023-02-22 15:38:01.589Z",
    "updated": "2023-02-22 15:38:01.589Z",
    "name": "buket",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "gahnqka1",
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
        "id": "lmjvqfpi",
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
        "id": "ocmqvyjj",
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
  const collection = dao.findCollectionByNameOrId("bzni82iqvv1utz0");

  return dao.deleteCollection(collection);
})
