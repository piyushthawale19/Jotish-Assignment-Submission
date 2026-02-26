# Jotish Employee Portal – Fully Functional Source Code

This project is a fully functional Employee Portal built with React, TypeScript, Material UI, and modern libraries. Below is a summary of the main source code structure and how the app works. For the complete code, see the `src/` directory in this repository.

## Main Features

- **Login Authentication** (with test credentials)
- **Employee List** with details, salary, and city
- **Employee Details** with photo capture and info
- **Photo Capture** using webcam and download
- **Salary Bar/Line Graph** for top 10 employees
- **Employee City Map** using Leaflet
- **Protected Routes** for secure navigation

## Key Source Files

- `src/App.tsx` – Main app, routing, theme
- `src/context/AuthContext.tsx` – Auth logic, mock login, context
- `src/pages/LoginPage.tsx` – Login UI and logic
- `src/pages/ListPage.tsx` – Employee list, navigation, logout
- `src/pages/DetailsPage.tsx` – Employee details, photo capture
- `src/pages/PhotoResultPage.tsx` – Show/download captured photo
- `src/pages/BarGraphPage.tsx` – Salary chart (bar/line)
- `src/pages/MapPage.tsx` – Employee city map (Leaflet)
- `src/components/ProtectedRoute.tsx` – Route protection
- `src/components/PhotoModal.tsx` – Webcam photo modal
- `src/data/mockEmployees.ts` – Mock employee data

## How It Works

1. **Login** with username `testuser` and password `Test123` (see LoginPage).
2. **Employee List**: View all employees, see details, chart, or map.
3. **Details**: View employee info, capture photo via webcam.
4. **Photo Result**: Download or retake photo.
5. **Bar Graph**: Visualize top 10 salaries (bar/line chart).
6. **Map**: See employees by city on an interactive map.
7. **Protected Routes**: Only accessible after login.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000)

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Preview of web-site 

<img width="1124" height="864" alt="Screenshot 2026-02-27 014931" src="https://github.com/user-attachments/assets/eae6c126-fc2d-4f62-9102-3f798b1b72f4" />
<img width="1871" height="859" alt="Screenshot 2026-02-27 014846" src="https://github.com/user-attachments/assets/6c4c1f27-9172-4773-a89d-d1a848f2b20b" />
<img width="1897" height="876" alt="Screenshot 2026-02-27 014906" src="https://github.com/user-attachments/assets/23ead4ee-180f-464f-a4ef-092c5a5ea85d" />
<img width="1915" height="881" alt="Screenshot 2026-02-27 014921" src="https://github.com/user-attachments/assets/a3b0af2a-ddcd-485e-8fc5-1c32a014b73f" />
#
