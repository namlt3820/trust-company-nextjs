# TrustCompany Next.js

This is the frontend for a review company website [TrustCompany](https://trustcompany.gladiolus.info/). It's powered by Next.js and created from its [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It includes some basic features typically found on a review company website:

1. Register users by email.
1. Create companies.
1. CRUD (Create, Read, Update, Delete) reviews.
1. CRUD comments.
1. Emojis.
1. Report/Feedback.

### ENV: NEXT_PUBLIC_PAYLOAD_URL_FROM_CLIENT and NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER

1. This project consists of two components: a Next.js server as the frontend and a PayloadCMS server as the backend.
1. The request coming from the Next.js server to PayloadCMS can be generated either from its server-side or client-side. If it originates from the server-side, the PayloadCMS server URL will be `NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER`. If it originates from the client-side, the PayloadCMS server URL will be `NEXT_PUBLIC_PAYLOAD_URL_FROM_CLIENT`
1. If you don't use Docker in local development, both values will have the same hostname (localhost) but different ports.
1. If you use a domain name in production, both values will also have the same hostname (the domain).
1. However, if you use Docker in local development, the `NEXT_PUBLIC_PAYLOAD_URL_FROM_CLIENT` and `NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER` might have different hostnames, hence the separation.
1. For example, `NEXT_PUBLIC_PAYLOAD_URL_FROM_CLIENT` can't use a container name because it's outside of the Docker context. Similarly, `NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER` can't use `localhost` because it points to the container itself, not to the host machine where Docker is running.

## Development

To spin up the project locally, follow these steps:

1. Spin up the [PayloadCMS server](https://github.com/namlt3820/trust-company-payloadcms) first, as it serves as the backend of the project.
1. Clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env.development`
1. Next `yarn && yarn dev` or `npm install && npm run dev`
1. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
1. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
1. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

That's it! Changes made in `./src` will be reflected in your app.

### Production with Docker

To start up a docker container in your production environment, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env.production`
1. Next `docker compose up --build -d`

That's it! The Docker instance will run and listen on port 3001 of your production machine.

## Production without Docker

To start up a Node.js server, you need to follow these steps:

1. First running `yarn build` or `npm run build` in your project root.
1. Then run `yarn start` or `npm run start` to run Node in production and serve Next.js from the `./next` directory.

## Questions

If you have any issues or questions, reach out to me on [Email](mailto:namlt3820@gmail.com) or start a [GitHub issue](https://github.com/namlt3820/trust-company-nextjs/issue).
