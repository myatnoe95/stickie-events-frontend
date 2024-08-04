This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Structure

The project structure is as follows:

I have used the following structure for the project:

- `components` : Contains all the components used in the project.
- `pages` : Contains all the pages of the project.
- `context` : Contains all the context used in the project.
- `types` : Contains all the types used in the project.
- `services` : Contains all the services used in the project to fetch data.
- `constants` : Contains all the constants used in the project.

## Project Features

A user can do the following: Some functions are only available to Admin users.

- Can create a new user with a username and password and role (Admin or Member).
- Can login with the created user.
- Can logout.
- Can view the list of users.
- Can Create a new event with a event name, description, date, time and location.
- Can view the list of events.
- Can view the details of the event.
- Can search by event name and description from the list of events.
- Can add the event photo of created event.
- Can view the list of event photos of the event.
