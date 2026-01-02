# CalidadDiscordBot

Bot designed for Calidad Discord Guild with the main purpose of managing temporal Voice Channels

## Environment Variables

This section describes the use and workflow of the environment variables used in this project. We use dotenvx to manage the environment variables so we can encrypt and store them publicly in github.

### Variables

The following environment variables related to Discord are used:

- `CHISMECITO_ID`: ID of the "Chismecito" voice channel
- `GAMING_ID`: ID of the "Gaming" voice channel
- `HOMEWORK_ID`: ID of the "Homework" voice channel
- `GUILD_ID`: ID of the Discord guild
- `CLIENT_ID`: ID of the Discord bot client
- `BOT_TOKEN`: Token of the Discord bot client
- `PUBLIC_KEY`: Public key of the Discord bot client

These have to be encrypted if publicly stored.

And the following environment variables related to the project:

- `STAGE`: Execution environment (dev, ci, prod)
- `DOCKERFILE_ENV`: Docker image to use for production (prod, dev). Default is dev.

### Workflow

The project environment variables are defined in the `.env` file. We mainly set manually these variables in the various machines and servers as they change infrequently for each machine and are few.

The Discord related environment variables are defined in separate files for each server and bot:

- `.env.quesito`: Variables for a development server and bot
- `.env.calidad`: Variables for a production server and bot

We use dotenvx to manage the environment variables, encrypt them and store them in github. The files are always encrypted and only decrypted at runtime by the library in the `src/config.ts` file. The keys for decryption are manually set in each machine.

Note: The DOCKERFILE_ENV variable may be derived from the STAGE variable as described in the next section, but at the moment we set it manually.

## Execution Stages

In this project, three stages are defined:

- **Development**: Local development and testing
- **Continuous Development (CD)**: Integration testing
- **Production**: Live deployment and production use

For our implementation the environment variables for each stage are defined as follows:

### Development

In the development stage, the variables are

```conf
STAGE=dev
DOCKERFILE_ENV=dev
```

The Discord related variables correspond to a development server and bot (`.env.quesito`).

### Continuous Development (CD)

In the CD stage, the variables are

```conf
STAGE=ci
DOCKERFILE_ENV=prod
```

The Discord related variables correspond to a test server and bot (`.env.quesito`).

### Production

In the production stage, the variables are

```conf
STAGE=prod
DOCKERFILE_ENV=prod
```

The Discord related variables correspond to a production server and bot (`.env.calidad`).
