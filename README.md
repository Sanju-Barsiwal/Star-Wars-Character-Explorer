# Star Wars Character Explorer

A web app to browse Star Wars characters using the SWAPI API. Built with React and a clean dark theme.
🔗 Live Preview: https://pgjcxz.csb.app/

## Running the Project

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## What I Built

**Core features:**
- Character listing with pagination
- Real-time search by name
- Gender filter
- Character detail modal with stats
- Homeworld information
- Fully responsive

**Extras:**
- Custom Star Wars favicon
- Loading states and error handling
- Smooth animations
- Keyboard navigation

## Key Design Choices

**Plain CSS instead of Tailwind**

I know the assignment preferred Tailwind, but I went with regular CSS for full control over styling and a smaller bundle. In a team setting, I'd use whatever framework the team prefers.

**Picsum Photos for images**

SWAPI doesn't include character images, so I used Picsum with name seeding. This keeps each character's image consistent across sessions.

**React hooks only (no Redux)**

The app is simple enough that useState and useEffect handle everything. Would add Redux/Context if it grew bigger.

**Pagination over infinite scroll**

Clearer navigation and better accessibility. Plus it matches how SWAPI returns data.

**Homeworld caching**

Batch fetch homeworlds when loading a page, cache them for faster modal opening. Slight tradeoff on initial load but much better UX overall.

## Tech Stack

- React 
- SWAPI API
- Plain CSS
- Picsum Photos

