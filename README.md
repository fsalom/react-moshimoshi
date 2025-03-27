# moshimoshi-react

`moshimoshi-react` is a lightweight and extendable HTTP client wrapper around Axios with automatic token handling, tailored for React applications. It manages login, token storage, access token refresh, and secured/unsecured API calls in a clean and reusable way.

## 🚀 Features

- 🔒 Access and refresh token management
- 🔄 Auto-refresh access tokens on 401 responses
- 🔐 Authenticated and public API requests
- ⚙️ Customizable endpoints and token storage
- 🔁 Singleton pattern to keep one global instance
- 🪝 React-friendly with browser redirect on auth failures
- 📦 Tree-shakable and optimized for bundlers

---

## 📦 Installation

```bash
npm install moshimoshi-react
# or
yarn add moshimoshi-react
```

---

## 🔧 Setup

### 1. Initialize the singleton client

```ts
import { Moshimoshi } from 'moshimoshi-react';
import { LocalStorageAdapter } from './storage/LocalStorageAdapter';
import { Endpoint } from './entity/Endpoint';

const storage = new LocalStorageAdapter();

const loginEndpoint = new Endpoint('/api/login', 'POST');
const refreshEndpoint = new Endpoint('/api/refresh', 'POST');

const api = Moshimoshi.getInstance(storage, loginEndpoint, refreshEndpoint);
```

### 2. Logging in

```ts
await api.login({
  username: 'user@example.com',
  password: 'securepassword',
});
```

### 3. Making requests

#### Authenticated

```ts
const securedEndpoint = new Endpoint('/api/private', 'GET');
const result = await api.loadAuthorized(securedEndpoint);
```

#### Public

```ts
const publicEndpoint = new Endpoint('/api/public', 'GET');
const result = await api.load(publicEndpoint);
```

### 4. Logging out

```ts
await api.logout(); // Will clear all tokens and redirect to /login
```

---

## 🧱 Core Concepts

### `Endpoint`

Encapsulates API endpoint details:

```ts
const endpoint = new Endpoint('/api/users/:id', 'GET', {
  parameters: { id: '123' },
  query: { include: 'details' },
  headers: { 'X-Custom': 'value' },
});
```

### `Token`

Represents access/refresh tokens with optional expiration.

### `Storage`

You can plug in your own `Storage` implementation (e.g., `localStorage`, `sessionStorage`, `SecureStore`) using the interface provided.

---

## 🧪 Example Storage Adapter

```ts
export class LocalStorageAdapter implements Storage {
  save(token: Token, type: TokenType): void {
    localStorage.setItem(type, JSON.stringify(token));
  }

  retrieve(type: TokenType): Token | undefined {
    const raw = localStorage.getItem(type);
    return raw ? Token.fromJSON(JSON.parse(raw)) : undefined;
  }

  deleteAll(): void {
    localStorage.clear();
  }
}
```

---

## 💡 Notes

- If the access token is expired and no refresh token is available, the user is redirected to `/login`.
- `loadAuthorized()` automatically attaches the Bearer token.
- You can add a `logoutEndpoint` for server-side session clearing.

---

## 🔗 Peer Dependencies

This package expects `react`, `react-dom`, and `react-router-dom` to be present in your project.

```json
"peerDependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.4.0"
}
```

---

## 📁 Project Structure

- Written in **TypeScript**
- Bundled with **Rollup**
- Output formats: `CommonJS` and `ESModule`
- Supports tree-shaking

---

## 📜 License

MIT

---

## ✨ Contributing

Feel free to open issues or submit PRs to improve the library. Feedback is always welcome!

---

## 🧠 TODO

- [ ] React hook integration (`useMoshimoshi`)
- [ ] Token expiration countdown utility
- [ ] SSR support
