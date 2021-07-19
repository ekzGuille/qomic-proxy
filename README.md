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
  "published_date": "date",
  "rating": "number",
  "language": "string",
  "publisher": "string",
}
```
* Formato del campo `published_date` : _YYYY-mm-dd_

### Ejemplo

* Petición al comic con id `mgFL7`
```
[GET] /api/comic/mgFL7
```
* Respuesta
```json
{
  "title": "El renacimiento de Marvel - Los años 2000",
  "item_number": 6,
  "description": "«YO SOY IRON MAN». - Han robado un terrible virus, Extremis, de un importante laboratorio de investigación, lo que podría tener consecuencias nefastas. Iron Man intenta evitarlo durante una misión que redefinirá la esencia del personaje de Tony Stark. También verás al vengador con armadura convertirse en… ¡el director de SHIELD! - Sumérgete en los cómics de Marvel de la década de los 2000 y descubre el renacimiento de La Casa de las Ideas. - Incluye: - Iron Man Vol,4 (2005) #1-6 (Ellis / Granov) - Iron Man: Director of SHIELD Vol.1 (2008) #29-32 (Stuart Moore / Pagulayan / De La Torre / Kurth)",
  "authors": [
    "Warren Ellis",
    "Stuart Moore",
    "Adi Granov",
    "Roberto De La Torre",
    "Carlo Pagulayan",
    "Steve Kurth",
    "Jeffrey Huet",
    "Andrew Hennessy",
    "Dean White",
    "Joel Seguin"
  ],
  "cover": "https://i1.whakoom.com/large/0b/00/504d828301d6488cb846f4e33ad5562a.jpg",
  "published_date": "2021-06-28",
  "rating": 4.2,
  "language": "Español (España)",
  "publisher": "Panini Comics España"
}
```

## Deployed endpoint

* [Vercel link](https://qomic-proxy.vercel.app/)
