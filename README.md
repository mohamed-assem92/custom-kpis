# Mohamed Assem's Backend Task

## About

## This backend application built using Fastify, Typescript, and MongoDB

## Prerequest

- Rename `.env.example` to `.env`
- If needed update envs inside the file

---

## Test

- Run `yarn run test`

---
## Start With Docker

- Update `.env` `MONGO_URL` to be `MONGO_URL=mongodb://mongo:27017/custom-kpis`
- to view on terminal `docker-compose --env-file ./.env up --build`
- run as daemon `docker-compose --env-file ./.env up -d --build`

---

## Start Without Docker

### Install packages `yarn`
- Update `.env` `MONGO_URL` to be `MONGO_URL=mongodb://localhost:27017/custom-kpis`

### Run application `yarn run dev`

#### Default Port without docker `8000` with docker `5000`

### Swagger

## `http://localhost:{PORT}/docs`

## API's

---

### Create KPI

`http://localhost:{PORT}/kpis`

**Method**: POST

**Accepts**: original document required fields (values and description) are optional fields
```
{
  "ownerId": 1,
  "title": "string",
  "xAxisTitle": "string",
  "yAxisTitle": "string",
  "description": "string",
  "values": {
    "xAxisValue": "string",
    "yAxisValue": "string"
  }
}
```

**Returnes**:

- Success: `status: 201`
---

### GET All KPIs for a User (Paginated)

`http://localhost:{PORT}/kpis/users/{OWNERID}`

**Method**: GET

**Accepts**: `ownerId` Required, `limit` Optional, `offset` Optional, as params

**Returnes**:

- Success: `status: 200` Array of user KPIs
```
{
  "docs": [
    {
      "ownerId": 1,
      "title": "revenue graph 3",
      "description": "this is my revenue graph 3",
      "xAxisTitle": "Revenue",
      "yAxisTitle": "Date",
      "values": [
        {
          "xAxisValue": 30,
          "yAxisValue": 2012
        },
        {
          "xAxisValue": 50,
          "yAxisValue": 2013
        },
        {
          "xAxisValue": 60,
          "yAxisValue": 2017
        },
        {
          "xAxisValue": 20,
          "yAxisValue": 2018
        },
        {
          "xAxisValue": 50,
          "yAxisValue": 2020
        }
      ],
      "createdAt": "2022-03-17T03:34:54.929Z",
      "updatedAt": "2022-03-17T05:55:33.542Z",
      "id": "6232ac5e062c7dad17c6817e"
    }
  ],
  "totalDocs": 1,
  "offset": 0,
  "limit": 100,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```
---

### Delete All KPIs for a User

`http://localhost:{PORT}/kpis/users/{OWNERID}`

**Method**: DELETE

**Accepts**: `ownerId` Required as query string param

**Returnes**:

- Success: `status: 201`
---

### Get KPI by ID

`http://localhost:{PORT}/kpis/{kpiId}`

**Method**: GET

**Accepts**: `kpiId` Required as query string param

**Returnes**:

- Success: `status: 200` KPI Object

```
{
  "ownerId": 1,
  "title": "revenue graph 3",
  "description": "this is my revenue graph 3",
  "xAxisTitle": "Revenue",
  "yAxisTitle": "Date",
  "values": [
    {
      "xAxisValue": 30,
      "yAxisValue": 2012
    },
    {
      "xAxisValue": 50,
      "yAxisValue": 2013
    },
    {
      "xAxisValue": 60,
      "yAxisValue": 2017
    },
    {
      "xAxisValue": 20,
      "yAxisValue": 2018
    },
    {
      "xAxisValue": 50,
      "yAxisValue": 2020
    }
  ],
  "createdAt": "2022-03-17T03:34:54.929Z",
  "updatedAt": "2022-03-17T05:55:33.542Z",
  "id": "6232ac5e062c7dad17c6817e"
}
```
---

### Delete KPI by ID

`http://localhost:{PORT}/kpis/{kpiId}`

**Method**: DELETE

**Accepts**: `kpiId` Required as query string param

**Returnes**:

- Success: `status: 201`
---

### Update KPI by ID

`http://localhost:{PORT}/kpis/{kpiId}`

**Method**: PATCH

**Accepts**: `kpiId` Required as query string param and partial fields of original document
```
{
  "title": "string",
  "xAxisTitle": "string",
  "yAxisTitle": "string",
  "description": "string"
}
```

**Returnes**:

- Success: `status: 201`
---

### Get KPI Values

`http://localhost:{PORT}/kpis/{kpiId}/values`

**Method**: GET

**Accepts**: `kpiId` Required as query string param 

**Returnes**:

- Success: `status: 200` returns array of value pairs
```
{
  "values": [
    {
      "xAxisValue": "30",
      "yAxisValue": "2012"
    },
    {
      "xAxisValue": "30",
      "yAxisValue": "20121"
    },
    {
      "xAxisValue": "30",
      "yAxisValue": "sadasdasd"
    },
    {
      "xAxisValue": "30",
      "yAxisValue": "sadasdasdw"
    },
    {
      "xAxisValue": 50,
      "yAxisValue": "assem2"
    }
  ],
  "id": "6232ac5e062c7dad17c6817e"
}
```
---

### Add KPI Value Pair

`http://localhost:{PORT}/kpis/{kpiId}/values`

**Method**: POST

**Accepts**: `kpiId` Required as query string param
```
{
  "xAxisValue": "string | number",
  "yAxisValue": "string | number"
}
```

**Returnes**:

- Success: `status: 201`
---

### Remove KPI Value Pair

`http://localhost:{PORT}/kpis/{kpiId}/values`

**Method**: DELETE

**Accepts**: Required `kpiId`, `xAxisValue`, `yAxisValue` as query string param

**Returnes**:

- Success: `status: 201`
---

### Update KPI Value Pair

`http://localhost:{PORT}/kpis/{kpiId}/values`

**Method**: PATCH

**Accepts**: Required `kpiId`, `xAxisValue`, `yAxisValue` as query string param
and new pair values
```
{
  "xAxisValue": "string | number",
  "yAxisValue": "string | number"
}
```

**Returnes**:

- Success: `status: 201`
---
