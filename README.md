# Wobb Influencer Search

A modern influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

This project was completed as part of the **Wobb Frontend Assignment**. The application allows users to search influencers, view profile details, and save profiles to a persistent list while following React best practices and performance optimizations.

---

## 🚀 Live Demo

**Live Application:**  
https://your-live-app-url.vercel.app

**GitHub Repository:**  
https://github.com/your-username/your-repository

---

# ✨ Features

### 🔍 Search & Filter

- Search influencers by username or full name
- Filter influencers by:
  - Instagram
  - YouTube
  - TikTok

### 👤 Profile Details

- Detailed influencer profile page
- Handles unavailable profiles gracefully
- Responsive UI

### 📌 Saved Profiles

- Add profiles to saved list
- Prevent duplicate entries
- Remove saved profiles
- Data persists using Local Storage
- Dedicated Saved Profiles page

---

# 🛠️ Improvements Made

## Bug Fixes

- Fixed broken profile navigation
- Prevented opening unavailable profiles
- Prevented invalid profiles from being saved
- Fixed duplicate profile issue
- Improved routing behavior

---

## Code Quality

Refactored the project for better maintainability.

### Better Folder Structure

```
src/
├── assets/
├── components/
├── constants/
├── hooks/
├── pages/
├── services/
├── storage/
├── utils/
└── types/
```

### Reusable Components

- AddToListButton
- Loading
- EmptyState
- Layout
- ProfileCard
- ProfileList
- VerifiedBadge

### Custom Hook

- useSavedProfiles

### Utility Functions

- formatFollowers()
- formatEngagementRate()

### Constants

- storage.ts

---

# ⚡ Performance Optimizations

Implemented several React optimization techniques.

### Rendering

- React.memo()
- useMemo()
- useCallback()

### Code Splitting

- React.lazy()
- Suspense

### Data Loading

- Promise.all()

### Images

- Lazy loading
- Async image decoding

---

# 📦 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

---

# 📚 Libraries Used

- React
- React Router
- Tailwind CSS
- TypeScript
- Vite

No additional production libraries were added. The project intentionally relies on React's built-in optimization APIs to keep the dependency footprint minimal.

---

# 📝 Assumptions

- Every valid profile has a corresponding detail JSON file.
- Profiles without a detail JSON are considered unavailable.
- Local Storage is available in the browser.
- Static JSON files are used as the application's data source.

---

# ⚖️ Trade-offs

- Used Local Storage instead of backend persistence.
- Kept state management lightweight without introducing additional dependencies.
- Used browser alerts for unavailable profiles to avoid adding notification libraries that conflicted with the provided project setup.

---

# 🚀 Future Improvements

Given more time, I would add:

- Toast notifications
- Unit testing (Vitest)
- React Testing Library
- End-to-end testing
- Better accessibility
- Skeleton loading
- Infinite scrolling
- Backend API integration
- Dark mode
- Better animations

---

# ▶️ Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Run ESLint

```bash
npm run lint
```

---

# ✅ Assignment Checklist

- ✔ Fixed bugs and quality issues
- ✔ Improved UI structure
- ✔ Implemented Add to List
- ✔ Prevented duplicate entries
- ✔ Persistent Local Storage
- ✔ Saved Profiles page
- ✔ Improved project structure
- ✔ React best practices
- ✔ Performance optimizations
- ✔ Clean TypeScript implementation

---

## 👨‍💻 Author

**Himanshu Kumar**

GitHub: https://github.com/harry7705
