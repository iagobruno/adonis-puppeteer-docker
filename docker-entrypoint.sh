#!/bin/sh

# node ace migration:rollback --batch 0
node ace migration:run

echo "Starting Adonis server..."

if [ ${NODE_ENV} = "production" ]; then
  yarn run build
  yarn run start
else
  yarn run dev
fi
