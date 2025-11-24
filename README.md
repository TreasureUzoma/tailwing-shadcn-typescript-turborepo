# Shadcn UI Monorepo Template

This template provides a robust monorepo setup, integrating `shadcn/ui` components with a Next.js application, all managed efficiently with Turborepo. It's designed to kickstart projects requiring a modern, consistent, and scalable UI development experience.

## Features

- **Monorepo Architecture:** Structured with Turborepo for efficient management of multiple packages, promoting code sharing and consistency.
- **shadcn/ui Integration:** Seamlessly use and extend `shadcn/ui` components for a modern and consistent user interface.
- **Next.js Application:** A pre-configured Next.js application (`apps/web`) ready for rapid development.
- **Shared UI Library:** A dedicated `packages/ui` library to house reusable UI components, ensuring a single source of truth for your design system.
- **Theming Support:** Built-in light/dark mode toggling using `next-themes` for a flexible user experience.
- **Toast Notifications:** Integrated `sonner` for beautiful and accessible toast notifications.
- **Type-Safe Development:** Comprehensive TypeScript configurations across the monorepo for robust and error-free development.
- **Optimized Linting:** Shared ESLint configurations for consistent code quality and adherence to best practices.
- **Atomic Design Principles:** Components like Button, Select, and DropdownMenu are implemented adhering to atomic design principles for modularity and reusability.

## Stacks / Technologies

| Technology                         | Description                                                                                                    | Link                                                                                     |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **Turborepo**                      | A high-performance build system for JavaScript and TypeScript monorepos.                                       | [https://turbo.build/](https://turbo.build/)                                             |
| **Next.js**                        | A React framework for building full-stack web applications with built-in features like routing and API routes. | [https://nextjs.org/](https://nextjs.org/)                                               |
| **shadcn/ui**                      | A collection of re-usable components built using Radix UI and Tailwind CSS.                                    | [https://ui.shadcn.com/](https://ui.shadcn.com/)                                         |
| **React**                          | A JavaScript library for building user interfaces, primarily for single-page applications.                     | [https://react.dev/](https://react.dev/)                                                 |
| **TypeScript**                     | A strongly typed superset of JavaScript that compiles to plain JavaScript.                                     | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)                       |
| **Tailwind CSS**                   | A utility-first CSS framework for rapidly building custom designs.                                             | [https://tailwindcss.com/](https://tailwindcss.com/)                                     |
| **pnpm**                           | A fast, disk space efficient package manager that uses a content-addressable store.                            | [https://pnpm.io/](https://pnpm.io/)                                                     |
| **ESLint**                         | A pluggable JavaScript linter that helps enforce code quality and coding style.                                | [https://eslint.org/](https://eslint.org/)                                               |
| **Sonner**                         | An opinionated toast component for React, offering highly customizable and accessible notifications.           | [https://sonner.emilkowalski.no/](https://sonner.emilkowalski.no/)                       |
| **next-themes**                    | An abstraction for themes in your Next.js app, providing seamless light/dark mode switching.                   | [https://github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes) |
| **Lucide React**                   | A beautiful and consistently designed collection of SVG icons, easily customizable for your projects.          | [https://lucide.dev/](https://lucide.dev/)                                               |
| **Radix UI**                       | A set of unstyled, accessible UI components for building high-quality design systems.                          | [https://www.radix-ui.com/](https://www.radix-ui.com/)                                   |
| **Class Variance Authority (cva)** | A utility for creating variant-based component styles with a clean API.                                        | [https://github.com/joe-bell/cva](https://github.com/joe-bell/cva)                       |

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/TreasureUzoma/tailwing-shadcn-typescript-turborepo myapp
    cd myapp
    ```

2.  **Install dependencies:**

    This project uses `pnpm` as its package manager. Ensure you have `pnpm` installed.

    ```bash
    pnpm install
    ```

## Usage

### Development

To start the development server for the Next.js application and watch for changes across all packages in the monorepo:

```bash
pnpm dev
```

The Next.js application will be accessible at `http://localhost:3000`.

### Adding shadcn/ui Components

To add new `shadcn/ui` components to your applications, navigate to the project root and use the `shadcn` CLI, specifying the `packages/ui` as the target:

```bash
pnpm dlx shadcn@latest add [component-name] -c packages/ui
```

For example, to add a `button` component:

```bash
pnpm dlx shadcn-ui@latest add button -c packages/ui
```

The components will be placed in the `packages/ui/src/components` directory, making them part of your shared UI library.

### Using Components in Your Web App

Once components are added to the `packages/ui` library, you can import and use them in your `apps/web` application:

```tsx
import { Button } from "@workspace/ui/components/button";
// ... other imports
```

### Building for Production

To build all applications and packages within the monorepo for production:

```bash
pnpm build
```

## Contributing

Contributions are always welcome! If you'd like to contribute, please follow these general steps:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`.
3.  **Make your changes.**
4.  **Commit your changes:** `git commit -m 'feat: Add new feature'`.
5.  **Push to the branch:** `git push origin feature/your-feature-name`.
6.  **Open a Pull Request.**

Please ensure your code adheres to the project's style guidelines by running `pnpm format` before committing.

[![Readme was generated by Readmit](https://img.shields.io/badge/Readme%20was%20generated%20by-Readmit-brightred)](https://readmit.vercel.app)
