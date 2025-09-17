

## BurgerMasters Front-end: `src/` Documentation


https://github.com/user-attachments/assets/d8dd266f-1d49-48aa-a432-474c06ae0fd4


This document describes the application architecture, modules, data flow, and conventions for the React front‑end located in the `src/` directory. It’s intended for contributors who want to understand how the app is structured and how to extend it safely.

### Tech Stack
- React 18 with `react-router-dom` for routing
- Context API for auth and cart state
- CSS Modules for component‑scoped styles
- Form validation with `yup`
- Fetch/request wrapper in `services/requester.js`

---

## Directory Structure

```
src/
  App.js                # Top-level routes and layout composition
  index.js              # React bootstrap and router mounting
  App.css               # Global app CSS (minimal; most styles are modules)
  logo.svg
  reportWebVitals.js
  setupTests.js

  Components/           # UI components grouped by domain/feature
  contexts/             # React Context providers (Auth, Cart)
  GuardedRoutes/        # Route guards for guest/user/admin
  hooks/                # Reusable hooks (e.g., localStorage)
  services/             # HTTP services and domain APIs
  Constants/            # Shared constants (page titles, action names)
  schemas/              # Yup validation schemas
```

### Components Overview
- `components/Layout/*`: `Header`, `Footer` rendered on every page.
- `components/Pages/*`: Top-level pages like `Home`, `ErrorPage`, `InternalServerErrorPage`.
- `components/Menu/*`: Menu listing screens by category (`BurgerMenu`, `FriesMenu`, etc.), `Menu`, filtering and list item UI.
- `components/Details/*`: Product details (`ItemDetails`), numeric input control, and similar products section.
- `components/Cart/*`: Cart page, side cart panel, and cart item card.
- `components/Authentication/*`: Login and Register forms with `FormInput`.
- `components/Admin/*`: Admin features for creating/editing items, managing posts by category, and order management (pending, history, details).
- `components/Review/*`: Simple chat/review UI (`Review`, `ChatWindow`, `ChatInput`, `Message`).

Each visual component typically has a `*.js` and matching `*.module.css` file.

---

## Application Entry and Routing

### Entry
- `index.js` mounts the app under `BrowserRouter`:
  - StrictMode → Router → `App`
- Web vitals are reported via `reportWebVitals` (no configuration required).

### Routes (`App.js`)
- Layout: `Header` and `Footer` wrap all routes.
- Primary content lives inside a `.container` div with `<Routes>`.

Key paths:
- Common
  - `/` → `Home`
  - `/*`, `/Not-found` → `ErrorPage`
  - `/Internal-server-error` → `InternalServerError`

- Guarded: `UserRoute` wraps all authenticated sections.
  - Admin-only within `UserRoute` via `AdminRoute`:
    - `/CreateItem` → `CreateMenuItem`
    - `/EditItem/:itemId` → `EditMenuItem`
    - `/Orders` → `PendingOrders`
    - `/OrderHistory` → `OrderHistory`
    - `/MyPosts/{Burgers|Drinks|Fries|Hotdogs|Grills|Salads|Sandwiches}` → respective lists
  - Authenticated user routes:
    - `/Menu/{Burgers|Drinks|Fries|Hotdogs|Grills|Salads|Sandwiches}`
    - `/Details/:itemId`
    - `/Cart`
    - `/MyOrders`
    - `/OrderDetails/:orderId`
    - `/Review`

- Guest-only via `GuestRoute`:
  - `/Login`, `/Register`

---

## State Management

### Contexts
- `contexts/AuthContext.js`
  - Holds authenticated user session and auth actions.
  - Consumed by guarded routes to check roles (User/Admin) and by auth UI.

- `contexts/CartContext.js`
  - Maintains cart items, quantities, and related actions.
  - Consumed by `Cart` pages, `Header` (cart indicator), and `ItemDetails` (add to cart).

Both providers are composed at the top level in `App.js` so they are available throughout routed content.

### Hooks
- `hooks/useLocalStorage.js`: Persist and hydrate state keys to/from `localStorage` with a React‑friendly API.

---

## Navigation & Guarded Routes

- `GuardedRoutes/GuestRoute.js`: Ensures only unauthenticated users can access guest routes like `Login` and `Register`.
- `GuardedRoutes/UserRoute.js`: Requires a logged-in user for protected areas.
- `GuardedRoutes/AdminRoute.js`: Requires the current user to have admin privileges.

Route components typically use context (Auth) to decide whether to render an `<Outlet />` or redirect.

---

## Forms and Validation

`schemas/index.js` defines Yup schemas:
- `createMenuItemSchema`, `editMenuItemSchema`: Validates item fields (`name`, `imageUrl`, `itemType`/`portionSize`, `description`, `price`).
- `reviewMessageItemSchema`: Length and content validation for review messages.

Use these schemas with your form library or manual validation before service calls.

---

## Constants

`Constants/globalConstants.js` holds shared labels and action names used across admin and orders UIs, e.g., `MENU_PAGE_NAME`, `PENDING_ORDERS_NAME`, and action tokens like `accept`/`decline`.

---

## Services Layer

Location: `services/`

Common patterns:
- `requester.js`: Centralized HTTP client (fetch wrapper). Other services should call this to standardize headers, auth token handling, and error normalization.
- Feature services (examples):
  - `authService.js`: login, register, logout, profile.
  - `menuItemService.js`: CRUD for menu items and listing by type.
  - `orderService.js`: create orders, fetch pending/history, update status, details by id.
  - `cartService.js`: helpers for server‑synced carts if applicable.
  - `reviewService.js`: sending/fetching review chat messages.
  - `adminService.js`: admin‑specific orchestration calls.
  - `navigationServices.js`: utilities supporting navigation flows.

Example usage pattern:
```js
import { createMenuItem } from '../services/menuItemService';

async function onCreate(values) {
  try {
    await createMenuItem(values);
    // navigate to list or show success
  } catch (err) {
    // surface err.message to UI
  }
}
```

---

## Styling

- Prefer CSS Modules (`*.module.css`) for component styles to avoid collisions.
- Keep styles colocated with the component.
- Use global `App.css` sparingly for application‑wide resets or layout helpers.

---

## Data Flow Summary
1. UI components dispatch user intents (e.g., submit create form, add to cart).
2. Validation via Yup schemas prevents invalid payloads.
3. Services issue HTTP requests via `requester.js` with auth context applied when needed.
4. Responses update Context state (`AuthContext`, `CartContext`) or local component state.
5. Guarded routes reflect auth changes immediately.

---

## Adding a New Feature (Checklist)

1. Create UI under the relevant domain folder in `components/` with `*.module.css`.
2. If data‑backed, add/extend a service in `services/` and export clear functions.
3. Add validation rules in `schemas/index.js` if your form collects inputs.
4. Add constants to `Constants/globalConstants.js` if you need shared labels.
5. Wire a route in `App.js`. If protected, place it under `UserRoute`; if admin‑only, nest under `AdminRoute`.
6. Consume or extend contexts as needed (`AuthContext`, `CartContext`).
7. Handle errors gracefully and provide user feedback.

---

## Error Handling

- Surface user‑friendly messages on failures (validation, network, or server errors).
- Consider redirecting to `/Internal-server-error` when encountering unrecoverable conditions.
- Log to console in development; avoid noisy logs in production builds.

---

## Testing

- `setupTests.js` is available for configuring Jest/RTL as needed.
- Co‑locate simple component tests next to components or create a `__tests__` folder per feature.

---

## Conventions & Tips

- Keep component files focused and readable; split UI from data concerns where reasonable.
- Name exports by intent: verbs for functions, nouns for values.
- Avoid deep prop drilling; prefer Context or local composition.
- Reuse `FilterSearchBar`, `ItemCard`, and `Loader` patterns across menu pages for consistency.

---

## Troubleshooting

- Routes not rendering? Ensure the component is placed under the correct guard (`GuestRoute`, `UserRoute`, `AdminRoute`).
- Auth/cart state missing? Confirm `AuthProvider` / `CartProvider` wrap your routes in `App.js`.
- Styles not applied? Verify the CSS module import path and className usage.
- API calls failing? Check `requester.js` base URL, headers, and auth token wiring.

---

## Useful References

- `App.js`: authoritative map of all routes and providers.
- `services/*`: source of truth for server interaction.
- `schemas/index.js`: single place to update form validation.
- `Constants/globalConstants.js`: shared labels/actions.


