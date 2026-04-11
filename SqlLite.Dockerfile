FROM alpine:latest
RUN apk update && apk add --no-cache sqlite
WORKDIR /app/db
RUN chmod -R 777 /app/db
# RUN chown -R node:node /app/db
CMD ["sqlite3"]


# docker exec -it sqllite-db ls -l /app/db/