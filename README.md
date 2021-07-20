## Getting Started

```bash
> yarn install
> copy .env.example .env # And edit the values
> node ace generate:key # Copy and paste into APP_KEY in .env file
> docker-compose up --build
```

```bash
> docker logs node-container --follow
```

## Testing

```bash
> docker exec -i node-container yarn run test
```
