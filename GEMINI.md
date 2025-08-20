# Gemini Code Assistant Context

This document provides context for the Gemini code assistant to understand the `react-numpad` project.

## Project Overview

`react-numpad` is a monorepo containing a React numpad component, a UI library, and a demo application. The project is built with pnpm workspaces, TypeScript, and Vite.

**Packages:**

- **`packages/numpad`**: The core `react-numpad` component.
- **`packages/ui`**: A shared UI library with components like `Button`, `Card`, `Input`, `Popover`, and `Separator`.
- **`apps/demo`**: A Vite-based React application that demonstrates the usage of the `react-numpad` component.

**Technologies:**

- **pnpm**: For monorepo management.
- **TypeScript**: For static typing.
- **React**: For building the UI.
- **Vite**: For the development server and build tooling.
- **Tailwind CSS**: For styling.
- **Effector**: For state management.
- **Turbo**: For build orchestration.

## Building and Running

- **Install dependencies**: `pnpm install`
- **Run the demo app**: `pnpm dev`
- **Build all packages**: `pnpm build`
- **Lint**: `pnpm lint` or `npx ultracite lint`
- **Format**: `pnpm format` or `npx ultracite format`

## Development Conventions

The project uses a tool called **Ultracite** to enforce strict type safety, accessibility standards, and consistent code quality. Key principles include:

- Zero configuration required
- Subsecond performance
- Maximum type safety
- AI-friendly code generation

Before writing code, it's important to analyze existing patterns, consider edge cases, and follow the extensive set of rules defined in `AGENTS.md`. These rules cover:

- **Accessibility (a11y)**: Ensuring the application is usable by everyone.
- **Code Complexity and Quality**: Maintaining a clean and readable codebase.
- **React and JSX Best Practices**: Following the latest React standards.
- **Correctness and Safety**: Avoiding common pitfalls and security vulnerabilities.
- **TypeScript Best Practices**: Using TypeScript effectively.
- **Style and Consistency**: Enforcing a consistent coding style.
- **Next.js Specific Rules**: Rules for Next.js projects.
- **Testing Best Practices**: Writing effective and reliable tests.

For a complete list of rules, please refer to the `AGENTS.md` file.
