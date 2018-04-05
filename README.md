# Event Sourcing in Typescript 

This repo its a demo to test implementations of [hollywood-js](https://github.com/jorge07/hollywood) in a pseudo real use case.

### Usage

Build env:

```bash
make build
```

UP all in containers:
```bash
make dev
```

UP Node in host and deps in containers:
```bash
make start
```

Event to elastic
```bash
make event-consumer
```
```bash
make user-projections
```

### REST

**Get User**

`GET` `/users/:uuid`

**Create User**

`POST` `/users`
```json
{
   "uuid": "efa48501-e187-4f17-9c71-3ea9cdb4e795",
   "email": "demo@demo.com"
}
```

### GraphQL

`http://localhost:3000/graphiq`

**Get User**

```
query {
  user(uuid: "efa48501-e187-4f17-9c71-3ea9cdb4e795"){
    email
    uuid
  }
}
```

**Create User**

```
mutation {
  createUser(uuid:"efa48501-e187-4f17-9c71-3ea9cdb4e795", email:"demo@demo.com")
}
```

### Tools

- Rabbit Admin: http://localhost:15672
- Kibana: http://localhost:5601 (index name: `events`)
