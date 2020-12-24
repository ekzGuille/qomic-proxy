# Qomic API Proxy

Proxy que mapea las peticiones de los cómics de: [Whakoom](https://www.whakoom.com/)

## Utilización
* Petición **GET** a
```
/api/comic/{comic_id}
```
* Datos a obtener
```json
{
  "title": "string",
  "number": "string",
  "description": "string",
  "authors": "string" // comma-separated values
}
```

