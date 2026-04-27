# HomeRise

HomeRise is an Indian property enhancement platform focused on helping middle-class homeowners plan affordable upgrades that improve comfort, resale appeal, and renovation ROI.

## Tech Stack
- Frontend: React 18 with React Router DOM v6
- Backend: Spring Boot 3.x (Java 17)
- Database: MySQL 8
- HTTP Client: Axios with reusable service layer
- Authentication: JWT token-based authentication
- State Management: React Context API

## Implemented Rubric Coverage
- Protected routing with `PrivateRoute` and admin-only nested routes
- Separate routes for `/`, `/login`, `/register`, `/dashboard`, `/properties`, `/recommendations`, `/admin`, `/admin/listings`, `/admin/recommendations`, and `*`
- Real-time inline validation on login, register, property, and recommendation forms
- Axios instance with configurable base URL, request interceptor, and response interceptor
- JWT-based login/register flow with session restore and expiry logout
- CRUD for properties and recommendations
- Global backend exception handling with standard `{ success, message, data }` responses
- Responsive navbar, admin sidebar, toast notifications, and 404 page

## Project Structure
```text
frontend/
  src/
    components/
    context/
    pages/
    services/
    utils/
    App.jsx
backend/
  src/main/java/com/homerise/
    config/
    controller/
    dto/
    exception/
    model/
    repository/
    security/
    service/
schema.sql
```

## Setup Instructions

### 1. Database
1. Create a MySQL database named `homerise`.
2. Run `schema.sql` in MySQL Workbench or CLI.
3. Optionally set your own password in an environment variable before starting Spring Boot:
   - PowerShell: `$env:DB_PASSWORD="your_mysql_password"`

### 2. Backend
1. Open `backend/src/main/resources/application.properties` if you want to customize ports, origins, or JWT secret.
2. Run:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
3. Backend API base URL: `http://localhost:8080/api`

### 3. Frontend
1. Create `frontend/.env` with:
```env
REACT_APP_API_URL=http://localhost:8080/api
```
2. Install dependencies:
```bash
cd frontend
npm install
```
3. Start the app:
```bash
npm start
```
4. Frontend runs at `http://localhost:3000`

## Deployment

### Frontend Deployment
- Recommended platform: Netlify
- Frontend config file included: `frontend/netlify.toml`
- SPA redirect file included: [frontend/public/_redirects](c:\Users\adity\OneDrive\Documents\full stack even sem\frontend\public\_redirects)
- Required environment variable:
```env
REACT_APP_API_URL=https://your-backend-domain/api
```

### Backend Deployment
- Recommended platform: Render
- Deploy manifest included: [render.yaml](c:\Users\adity\OneDrive\Documents\full stack even sem\render.yaml)
- Portable container build included: [backend/Dockerfile](c:\Users\adity\OneDrive\Documents\full stack even sem\backend\Dockerfile)
- Required backend environment variables:
```env
SPRING_DATASOURCE_URL=jdbc:mysql://your-host:3306/homerise?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
SPRING_DATASOURCE_USERNAME=your_mysql_username
SPRING_DATASOURCE_PASSWORD=your_mysql_password
JWT_SECRET=your-long-random-secret
CORS_ALLOWED_ORIGINS=https://your-frontend-domain
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
```

### Important Deployment Note
- Public deployment links cannot be created from this machine unless you are logged into a hosting provider account or provide deployment tokens.
- The project is now deployment-ready, but actual public URLs still require:
  - a frontend hosting account
  - a backend hosting account
  - a cloud-accessible MySQL database

## Recommended Commit Messages
- `feat: add JWT authentication`
- `feat: add property CRUD`
- `feat: add admin recommendation management`
- `fix: validation on register form`
- `fix: handle token expiry in protected routes`

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/properties`
- `POST /api/properties`
- `PUT /api/properties/{id}`
- `DELETE /api/properties/{id}`
- `GET /api/recommendations`
- `POST /api/recommendations`
- `PUT /api/recommendations/{id}`
- `DELETE /api/recommendations/{id}`

## Notes
- Recommendation category `Smart Home` is stored as `Smart_Home` in MySQL so it maps cleanly to the backend enum.
- If `npm run build` fails because `build/` is locked by another process, close the process using it or build to a temporary path.
