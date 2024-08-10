# Webpack Preact Jest Starter

This is a production-ready starter template for building Preact applications with Webpack and Jest. It includes image optimization for responsive designs, Progressive Web App (PWA) features, and is configured for easy deployment to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjameswquinn%2Fwebpack-preact-jest-starter)

## Features

- Preact for efficient UI rendering
- Webpack for bundling and asset management
- Jest for testing
- Image optimization with responsive sizes and formats (WebP, JPEG, PNG)
- CSS optimization including CSS Modules, PostCSS, and Critical CSS extraction
- Progressive Web App (PWA) features with offline support
- Automatic favicon generation
- Vercel-ready configuration

## Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`
5. Run tests: `npm test`

## Progressive Web App

This starter includes PWA features:
- Service Worker for offline support
- Web App Manifest for installability
- Favicon generation for various devices

## Deployment

### Option 1: One-Click Deploy with Vercel

Click the "Deploy with Vercel" button above to create a new GitHub repo, clone this project, and deploy to Vercel in one click.

### Option 2: Manual Deployment

1. Push your code to a GitHub repository.
2. Import your project into Vercel.
3. Vercel will detect that you have a `vercel.json` file and use the appropriate settings.

### Option 3: Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory to deploy.

## Development

- Run `npm start` to start the development server.
- The app will be available at `http://localhost:3000`.

## Testing

- Run `npm test` to run the Jest test suite.

## Building for Production

- Run `npm run build` to create a production build.
- The built files will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
