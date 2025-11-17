# 📋 Project Structure

This document explains the organization and purpose of each file and directory in this template.

## Directory Tree

```
telegram-bot-template/
├── .github/                    # GitHub-specific files
│   ├── workflows/
│   │   └── ci.yml             # CI/CD pipeline configuration
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md      # Bug report template
│   │   └── feature_request.md # Feature request template
│   └── PULL_REQUEST_TEMPLATE.md
│
├── scripts/                    # Utility scripts
│   └── setup.sh               # Automated setup script
│
├── src/                        # Source code
│   ├── commands/              # Bot command handlers
│   │   ├── index.ts          # Command registration
│   │   └── hello.ts          # /hello command implementation
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types
│   ├── utils/                # Utility functions
│   │   └── logger.ts         # Logging utility
│   └── index.ts              # Application entry point
│
├── dist/                       # Compiled JavaScript (generated)
│
├── .dockerignore              # Docker ignore rules
├── .editorconfig              # Editor configuration
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .nvmrc                     # Node version specification
├── .prettierrc.json           # Prettier configuration
│
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── DEPLOYMENT.md              # Deployment instructions
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker container definition
├── env.template               # Environment variable template
├── ENV_SETUP.md               # Environment setup guide
├── EXAMPLES.md                # Code examples and patterns
├── LICENSE                    # Project license
├── package.json               # NPM dependencies and scripts
├── PROJECT_STRUCTURE.md       # This file
├── QUICK_START.md             # Quick start guide
├── README.md                  # Main documentation
├── tsconfig.json              # TypeScript configuration
```

## File Purposes

### Root Configuration Files

#### `package.json`

- Defines project metadata
- Lists dependencies (runtime and development)
- Contains npm scripts for common tasks
- Specifies Node.js version requirements

#### `tsconfig.json`

- TypeScript compiler configuration
- Enables strict type checking
- Sets compilation target and module system
- Configures source maps for debugging

#### `.eslintrc.json`

- ESLint rules for code quality
- TypeScript-specific linting rules
- Enforces consistent code style

#### `.prettierrc.json`

- Code formatting rules
- Ensures consistent style across the project

#### `.editorconfig`

- Editor-agnostic configuration
- Ensures consistent indentation and line endings
- Works across different IDEs

#### `.gitignore`

- Specifies files Git should ignore
- Excludes node_modules, dist, .env, etc.

#### `.dockerignore`

- Specifies files Docker should ignore
- Similar to .gitignore but for Docker builds

#### `.nvmrc`

- Specifies Node.js version for NVM users
- Ensures consistent Node.js version

### Source Code (`src/`)

#### `src/index.ts`

**Purpose**: Application entry point

**Responsibilities**:

- Load environment variables
- Initialize Telegraf bot
- Register commands and handlers
- Start the bot
- Handle graceful shutdown

#### `src/commands/`

**Purpose**: Command handlers directory

**Organization**:

- `index.ts` - Central command registration
- Individual files for each command (e.g., `hello.ts`)

**Pattern**:

```typescript
// Each command file exports an async function
export async function commandName(ctx: Context): Promise<void> {
  // Command logic
}
```

#### `src/utils/`

**Purpose**: Shared utility functions

**Current utilities**:

- `logger.ts` - Consistent logging across the app

**Future additions**:

- Database helpers
- API clients
- Validation functions
- Date/time utilities

#### `src/types/`

**Purpose**: TypeScript type definitions

**Contents**:

- Custom type definitions
- Interface declarations
- Type utilities
- Environment variable types

### Documentation Files

#### `README.md`

- Main project documentation
- Setup instructions
- Feature overview
- Usage examples

#### `QUICK_START.md`

- Condensed setup guide
- Minimal steps to get started
- For users who want to start quickly

#### `DEPLOYMENT.md`

- Deployment instructions for various platforms
- Production configuration
- Monitoring and logging
- Scaling considerations

#### `ENV_SETUP.md`

- Detailed environment variable setup
- BotFather instructions
- Security best practices

#### `EXAMPLES.md`

- Code examples
- Common patterns
- Advanced features
- Integration examples

#### `PROJECT_STRUCTURE.md`

- This file
- Explains project organization
- Documents file purposes

#### `CHANGELOG.md`

- Version history
- Notable changes
- Release notes

### Docker Files

#### `Dockerfile`

- Multi-stage build for optimal image size
- Production-ready container
- Non-root user for security

#### `docker-compose.yml`

- Development and production setup
- Environment variable configuration
- Volume and network definitions

#### `.dockerignore`

- Excludes unnecessary files from Docker build
- Reduces image size
- Speeds up builds

### GitHub Files (`.github/`)

#### `workflows/ci.yml`

- Continuous Integration pipeline
- Runs on push and pull requests
- Tests, lints, and builds code
- Supports multiple Node.js versions

### Scripts (`scripts/`)

#### `setup.sh`

- Automated setup script
- Checks prerequisites
- Installs dependencies
- Creates .env file
- Provides next steps

## Adding New Files

### When to add a new file

1. **New Command**: Create `src/commands/[name].ts`
2. **Utility Function**: Add to `src/utils/[name].ts`
3. **Type Definitions**: Add to `src/types/[name].ts`
4. **Documentation**: Add to root with `.md` extension

### File Naming Conventions

- **TypeScript files**: camelCase (e.g., `userProfile.ts`)
- **Documentation**: UPPERCASE (e.g., `README.md`)
- **Configuration**: lowercase (e.g., `.eslintrc.json`)
- **Directories**: lowercase (e.g., `commands/`, `utils/`)

### File Size Guidelines

- Keep files under 200 lines
- Split large files into logical modules
- One responsibility per file

## Import Conventions

### Import Order

1. External packages
2. Internal modules
3. Type imports

```typescript
// External
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

// Internal
import { logger } from './utils/logger';
import { setupCommands } from './commands';

// Types
import type { BotEnvironment } from './types';
```

## Build Output (`dist/`)

- Generated by TypeScript compiler
- Not committed to Git
- Contains JavaScript files
- Preserves directory structure
- Includes source maps for debugging

## Best Practices

1. **Keep it modular**: Each file has one clear purpose
2. **Document everything**: Use JSDoc comments
3. **Type everything**: No `any` types
4. **Test before commit**: Run lint and type-check
5. **Update docs**: Keep documentation current

## Questions?

- See [EXAMPLES.md](./EXAMPLES.md) for code patterns
- Check [BEGINNERS_GUIDE.md](./BEGINNERS_GUIDE.md) if you're new
- Open an issue for clarification

---

Last updated: 2025-11-17
