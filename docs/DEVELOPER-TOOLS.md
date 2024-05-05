## Developer Tools Documentation

### Scripts

- **build**: Compiles TypeScript files to JavaScript using TypeScript Compiler (`tsc`).
- **start**: Starts the application by running the compiled JavaScript files.
- **dev**: Starts the application in development mode using `nodemon` to automatically restart the server when changes are detected in TypeScript files (`*.ts`).
- **lint**: Runs ESLint to lint JavaScript and TypeScript files (`*.js`, `*.ts`, `*.tsx`) for code quality and style issues.
- **lint:fix**: Runs ESLint in fix mode to automatically fix linting errors and code style issues in JavaScript and TypeScript files (`*.js`, `*.ts`, `*.tsx`).
- **format**: Formats files using Prettier to ensure consistent code style and formatting for JavaScript, TypeScript, JSX, JSON, and Markdown files (`*.js`, `*.jsx`, `*.ts`, `*.tsx`, `*.json`, `*.md`).
- **format:check**: Checks if files meet the formatting standards defined by Prettier without modifying them.
- **pc**: Shortcut command to run `lint` with `--fix` flag followed by `format` command.
- **prepare**: Initializes Husky Git hooks or installs Husky if not already installed.
- **release**: Automates versioning and generates release notes using `standard-version`.

### Command

- **git cz**: Shortcut for `git commit` using Commitizen to standardize commit messages following conventional commit message format.

These scripts and commands facilitate various development tasks such as building, starting the application, running in development mode, linting, formatting, versioning, and committing changes following a specific convention. Adjustments can be made based on specific project requirements and preferences.
