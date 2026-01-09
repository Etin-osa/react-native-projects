# Copilot Instructions for React Native Projects

## Project Context
The goal of this workspace is to create several React Native projects for publication. A secondary objective is to learn and utilize all VS Code Copilot features efficiently during the build process.

## Coding Style
- **Variables**: Prefer `const` over `let`. Use descriptive variable names.
- **Type Safety**: Always include TypeScript types.
- ** formatting**: Don't use any semi-colons.
- **Clean Code**: No comments.
- **Git**: Background agents should not stage any commit. Every git action will be taken manually by the user.
- **Tab Size**: Use 4 spaces for indentation.

## Error Handling
- Use `try/catch` blocks for async operations.
- Implement proper error boundaries in React components.
- Always log errors with contextual information.

## TypeScript Guidelines
- Use TypeScript for all new code.
- Follow functional programming principles where possible.
- Use interfaces for data structures and type definitions.
- Prefer immutable data (`const`, `readonly`).
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators.
