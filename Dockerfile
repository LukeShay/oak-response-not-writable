FROM denoland/deno:alpine-1.11.0

WORKDIR /app
RUN chown deno:deno /app && \
    apk update --no-cache

USER deno

COPY . .

RUN deno cache \
    --import-map=import_map.json \
    --unstable \
    application.ts

RUN deno run \
    --unstable \
    --allow-read \
    --allow-write \
    --allow-env \
    --import-map=import_map.json \
    scripts/build_assets.ts

CMD [ \
    "deno", \
    "run", \
    "--unstable", \
    "--allow-net", \
    "--allow-read", \
    "--allow-env", \
    "--import-map=import_map.json", \
    "application.ts" \
]
