---
applyTo: "**/*.ts,**/*.tsx
---
# Project coding standards for TypeScript and React


## TypeScript Guidelines

- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Avoid the use of `any` to fix ts problems
- Use optional chaining (?.) and nullish coalescing (??) operators
- Imports should be relative to the current file, not absolute paths

## React Guidelines

- Use class components when state or effects are needed
- Auto-bound arrow functions names in components should start with `_`
- Keep components small and focused
- Use CSS modules for component styling
- Use `classNames` library for optional styling

## Component creation
- Use the components provided by the package `@loginapp/ui` as building blocks. Components in the application should just arrange those components in a layout and provide a specific functionality.
- Keep component small and doing one thing.

## Data loading
- Use the library provided by the package `@loginapp/api-client` to load data from the API.
- Components use loaders to declare what data they need and load it on demand. See the [api-client docs to know more](../../packages/api-client/readme.md).
- The app is already listening to changes when new data is loaded, so there is no need to add listeners to re-render in internal components.
