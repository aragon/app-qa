# Aragon App - QA

The `app-qa` repository is responsible for running end-to-end (E2E) tests against the
[`app-next`](https://github.com/aragon/app-next) and the [`app-backend`](https://github.com/aragon/app-backend)
repositories. These tests ensure the stability and functionality of the Aragon App by simulating real user interactions
using Playwright and Synpress.

## Requirements

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Yarn](https://yarnpkg.com/) (Or npm, if preferred)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to set up and run E2E tests locally:

1. **Install dependencies:**

    ```bash
    yarn install
    ```

2. **Set up environment variables:**

    Create a `.env` file in the root directory using `.env.example` as a template. Ensure it includes the necessary
    variables:

    ```bash
    cp .env.example .env
    ```

    Required environment variables:

    ```bash
    METAMASK_SEED_PHRASE=<your-seed-phrase>
    METAMASK_PASSWORD=<your-password>
    ```

3. **Build Synpress cache (required for MetaMask integration):**

    ```bash
    yarn setup
    ```

## Running E2E Tests

Ensure your MetaMask wallet has sufficient funds before running tests.

- **Run all tests:**

    ```bash
    yarn test
    ```

- **Run tests on a specific browser (e.g., Firefox):**

    ```bash
    yarn test --project=firefox
    ```

- **Run tests on a specific environment (e.g., Staging):**

    ```bash
    TEST_ENV=staging yarn test
    ```

- **Run tests on a custom URL:**

    ```bash
    TEST_ENV=custom CUSTOM_URL=https://custom.app.aragon.org yarn test
    ```

- **View more options in the Playwright configuration file:** [`playwright.config.js`](./playwright.config.ts)

## Documentation

The E2E testing framework utilizes the following tools:

- [Playwright](https://playwright.dev/)
- [Synpress](https://synpress.io/)
- [MetaMask](https://metamask.io/)

For more details, refer to the [Playwright Documentation](https://playwright.dev/docs/intro) and
[Synpress Documentation](https://docs.synpress.io/docs/introduction).

## Contributing

Contributions are welcome! If you plan to make significant changes, please open an issue first for discussion. Ensure
that your tests cover expected behaviors before submitting a pull request.

## Security

If you discover any security issues, please report them to the security contact at `sirt@aragon.org`. Do not use the
issue tracker for security concerns.

## Learn More

For more information about Aragon and its ecosystem, please visit the [Aragon website](https://aragon.org/) and explore
our [Developer Portal](https://devs.aragon.org/). Join our
[Developer Community](https://aragonproject.typeform.com/to/LngekEhU) to stay updated and contribute to the growth of
decentralized governance.

## License

[GPL-V3](./LICENSE)
