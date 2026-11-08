# 💪 FitLog — Workout Library & Planner

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, open a detailed page for each one, lock your favourites into **today's plan** (max 5) or **save them for later**, and watch your total minutes and calories add up live.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 15 (App Router) | UI, routing, dynamic routes, server & client components |
| React 19 | Components, hooks, Context API |
| Tailwind CSS 3 | Styling & responsive design |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| localStorage | Persisting plan & saved data |

## ✨ Key Features

1. **Workout Library** — responsive 3-column grid of workouts fetched from the API, with a loading animation and search by name or muscle group.
2. **Dynamic Details Page** — `/workouts/[id]` with image, key specs, 4-step instructions and action buttons.
3. **Today's Plan & Saved** — add a lift to today's plan (cap of 5) or save it for later; navbar badges update instantly.
4. **My Plan Dashboard** — live Exercises / Minutes / Calories summary, tabs, sort dropdown (Duration, Calories, Rating), Mark as Done and Remove actions.
5. **Persistent State** — plan, saved list and done status survive a page reload through `localStorage`.
6. **Polished UX** — toast notifications, empty states, custom 404 page and a fully responsive layout.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
  page.js                 # Home (hero + library)
  my-plan/page.js         # My Plan page
  workouts/[id]/page.js   # Workout details
  api/workouts/route.js   # API proxy route
  not-found.js            # 404 page
components/               # Navbar, Footer, Hero, cards, actions…
context/PlanContext.jsx   # Global plan/saved state + localStorage
lib/api.js                # API helpers (with fallback API)
```

## 🌐 Deployment

Deploy on Vercel: import the GitHub repo and click **Deploy** — no extra configuration needed.

- Live Link: _add your link here_
- GitHub Repository: _add your link here_
