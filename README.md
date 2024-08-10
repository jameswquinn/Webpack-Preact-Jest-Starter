# Webpack Preact Jest Starter

This is a production-ready starter template for building Preact applications with Webpack and Jest. It includes image optimization for responsive designs, Progressive Web App (PWA) features, and is configured for easy deployment to Vercel and development on CodeSandbox.io.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjameswquinn%2Fwebpack-preact-jest-starter)

## Features

- Preact for efficient UI rendering
- Webpack for bundling and asset management
- Jest for testing
- Image optimization with responsive sizes and formats (WebP, JPEG, PNG)
- Intelligent handling of transparent PNG images
- CSS optimization including CSS Modules, PostCSS, and Critical CSS extraction
- Progressive Web App (PWA) features with offline support
- Automatic favicon generation
- Vercel-ready configuration
- CodeSandbox.io compatible
- Bundle analysis with Webpack Bundle Analyzer

## Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`
5. Run tests: `npm test`

## Development on CodeSandbox.io

This project is configured to work seamlessly on CodeSandbox.io. The webpack dev server is set up to allow for external preview.

To develop on CodeSandbox.io:
1. Import this project into CodeSandbox.io
2. The development server will start automatically
3. You can use the external preview feature without any additional configuration

## Image Optimization

This starter includes advanced image optimization:
- Generates WebP versions of images with JPEG/PNG fallbacks
- Creates multiple sizes for responsive loading
- Intelligently handles transparent PNG images
- Generates image placeholders for lazy loading

Usage in components:

```jsx
import { h } from 'preact';
import Image from './components/Image';
import myImage from './assets/my-image.png';

function MyComponent() {
  return <Image src={myImage} alt="My Image" />;
}
```

## Progressive Web App

This starter includes PWA features:
- Service Worker for offline support
- Web App Manifest for installability
- Favicon generation for various devices

## Deployment

### Option 1: One-Click Deploy with Vercel

Click the "Deploy with Vercel" button at the top of this README to create a new GitHub repo, clone this project, and deploy to Vercel in one click.

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

## Bundle Analysis

This project includes Webpack Bundle Analyzer for visualizing the size of webpack output files.

To generate a static report:
- Run a production build: `npm run build`
- Open `dist/bundle-report.html` in a web browser

To start an interactive analyzer server:
- Run `npm run analyze`
- The analyzer will start a server and automatically open in your default web browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---
