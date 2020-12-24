# Qomic API Proxy

Proxy que mapea las peticiones de la web de cómics [Whakoom](https://www.whakoom.com/)

## Utilización
* Petición **GET** a
```
/api/comic/{comic_id}
```
* Datos a obtener
```json
{
  "title": "string",
  "item_number": "number",
  "description": "string",
  "authors": "string[]",
  "cover": "string",
  "published_date": "date", // YYYY-mm-dd
  "rating": "number",
  "language": "string",
  "publisher": "string",
}
```

