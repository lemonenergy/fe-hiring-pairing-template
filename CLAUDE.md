# CLAUDE.md - Frontend Project Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix

## Code Style
- **Formatting**: Uses Prettier with 80 char line width, no semi-colons, single quotes
- **Component Style**: Arrow function components only
- **Imports**: Alphabetized with newlines between groups
- **TypeScript**: TypeScript declarations in .d.ts files
- **Styling**: Styled-components with CSS template literals
- **Conventions**:
  - No React imports needed (uses new JSX transform)
  - React components use PascalCase
  - Files use .jsx extension
  - Max line length: 80 characters

## Error Handling
- Use conditional rendering for potential nulls
- Optional chaining for nested properties
- Early returns for invalid props

## Opinions
- Don't use prop-types (TypeScript preferred)
- Follow Airbnb + Prettier style guide
- Components should be small and focused