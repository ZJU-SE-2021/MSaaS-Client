# MSaaS-Client

---

## Setup

```bash
npm install --global expo-cli yarn
cd MSaaS-Client
yarn
yarn start
# You can also optimize blobs after adding new assets
npx expo-optimize
```

Use `Expo Go` app on your phone or web browser for development

### OpenAPI Code Generation

```bash
openapi-generator generate -i https://msaas.app.ncj.wiki/api/swagger/v1/swagger.json -g typescript-fetch
```

## Docs & Refs

Below are docs and references that might be useful

- [Expo Docs](https://docs.expo.io/)
- [React Native Networking Docs](https://reactnative.dev/docs/network)
- [React Native Paper Docs](https://callstack.github.io/react-native-paper/index.html)
