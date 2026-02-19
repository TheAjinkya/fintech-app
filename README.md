# Financial Instruments Table

A single-page React application that displays and sorts a list of financial instruments.

Built as part of a Frontend Engineer technical assessment using **React + TypeScript + Vite**.

---

## Features

- Sortable table:
  - **Ticker** → alphabetical
  - **Price** → numeric
  - **Asset Class** → custom priority (Equities → Macro → Credit)
- Active column highlighting
- Sticky table header with scrollable body
- Currency formatting (GBP)
- Positive / negative price colouring
- Row colour coding by asset class
- Consistent column sizing using `colgroup`
- Accessible button-based sorting
- Clean, responsive layout

---

## Sorting Rules

### Asset Class Priority

1. Equities
2. Macro
3. Credit

Sorting is handled using pure utility functions to keep UI components stateless and testable.

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **CSS Modules**
- **ESLint**

---


## Getting Started
```
1. Install dependencies
npm install
2. Run the development server
npm run dev
3. Build for production
npm run build
4. Preview production build
npm run preview
```
- Testing
Run tests with:
```
npm run test
```
Business logic (sorting) is implemented as pure functions so it can be unit tested independently from the UI.

## UI & Styling
CSS Modules for scoped styling

table-layout: fixed for stable column sizing

colgroup used to guarantee header/body alignment

font-variant-numeric: tabular-nums for financial data readability

Sticky header inside scroll container

## Accessibility

Sorting is implemented using <button> inside table headers

Keyboard and screen-reader friendly

Clear visual indication of active sort column

## Performance Considerations
useMemo used to avoid unnecessary resorting

Stateless row components for efficient rendering

Pure sorting utilities

## Data Layer
The app currently uses a mock API (local JSON) wrapped in a service.

This allows easy replacement with a real backend without changing UI components.

## Scalability
The architecture supports:

Server-side data

Pagination / virtualization

Additional columns

Multi-column sorting

Real-time updates

## Design Decisions
Single source of truth for sorting state in the table component

Controlled header component for predictable UI

Utility-based business logic for testability

Colgroup for column sizing to avoid layout shift with sticky headers

## Future Improvements
Column resize

Multi-column sorting

Row virtualization for large datasets

Theming support

Storybook for component isolation

## Author
Ajinkya Chanshetty
