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
make start-workers
```

### Tools

- Rabbit Admin: http://localhost:15672
- Kibana: http://localhost:5601 (index name: `events`)