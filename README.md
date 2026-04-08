# Currency Exchanger

A clean and responsive React app for converting currencies in real time using ExchangeRate-API.

## Features

- Real-time currency conversion
- Default currencies set to USD and INR
- Swap button for quick from/to reversal
- Auto-conversion with debounced amount input
- Validation for invalid and extreme amount values
- Graceful loading and error states
- Animated, modern UI with country flags

## Tech Stack

- React (Create React App)
- Custom React hooks
- CSS3 (custom styling)
- ExchangeRate-API

## Project Structure

```text
currency-exchanger/
	public/
	src/
		components/
		data/
		hooks/
	package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shubhamNITP/CurrencyExchanger.git
cd CurrencyExchanger/currency-exchanger
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (`currency-exchanger/`) with:

```env
REACT_APP_API_KEY=your_exchange_rate_api_key
REACT_APP_API_BASE_URL=https://v6.exchangerate-api.com/v6
```

### 4. Start development server

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Creates a production build in the `build/` folder.
- `npm test`: Runs tests in watch mode.
- `npm run eject`: Exposes CRA build configuration.

## Build For Production

```bash
npm run build
```

The output is generated in the `build/` directory.

## Deployment

You can deploy the `build/` output to any static hosting provider:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Notes

- Environment variables in CRA are baked into frontend bundles. Do not use this pattern for highly sensitive secrets in production.
- Keep `.env` out of version control.

## Author

Shubham
