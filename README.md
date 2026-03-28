
# 📦 Order Management System (OMS)

Un sistem complet de gestionare a comenzilor, construit ca aplicație full‑stack (React + Node.js + Express + Prisma). Include autentificare JWT, dashboard administrativ, listă de produse, comenzi, statusuri și un seed automat pentru date demo.

---

## 🚀 Demo Live

### **Frontend (GitHub Pages)**
🔗 https://anisoara1.github.io/

### **Backend (Render)**
🔗 https://order-management-system-6hgx.onrender.com

---

## 🔐 Cont Demo pentru Recrutori

Puteți testa aplicația folosind următorul cont:

- **Email:** `admin@admin.com`
- **Parolă:** `123456`

Acest cont este creat automat la fiecare deploy.

---

## 🧩 Funcționalități principale

### 🔑 Autentificare & Securitate
- Login cu JWT
- Protecție pentru rutele backend
- Token salvat în localStorage
- Middleware de validare JWT

### 📊 Dashboard
- Vizualizare rapidă a statisticilor:
  - număr total de produse
  - număr total de comenzi
  - comenzi noi / în procesare / livrate

### 🛒 Produse
- Listă completă de produse software
- Date generate automat prin seed
- Preț, stoc, nume, dată creare

### 📦 Comenzi
- Listă de comenzi cu:
  - nume client
  - telefon
  - adresă
  - total
  - status
  - itemele din comandă
- Statusuri: `new`, `processing`, `delivered`

### 📱 Responsive Design
- Interfață optimizată pentru desktop și mobil
- Testată pe Chrome DevTools (Android & iOS viewports)

---

## 🛠️ Tehnologii folosite

### **Frontend**
- React + Hooks
- React Router
- Axios
- CSS modular

### **Backend**
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- CORS configurat pentru GitHub Pages

### **Bază de date**
- SQLite (pentru demo)
- Prisma Migrate + Seed

### **Hosting**
- Frontend: GitHub Pages
- Backend: Render

---

## 📂 Structura proiectului

```
/frontend
  /src
    /components
    /pages
    /services
    App.jsx
    index.jsx

/backend
  /prisma
    schema.prisma
    seed.js
  server.js
  routes/
  controllers/
  middleware/
```

---

## 🧪 Cum rulezi local

### 1. Clonează repository-ul
```
git clone https://github.com/<username>/<repo>.git
```

### 2. Instalează dependențele

#### Backend:
```
cd backend
npm install
```

#### Frontend:
```
cd frontend
npm install
```

### 3. Rulează backend-ul
```
npm start
```

### 4. Rulează frontend-ul
```
npm run dev
```

---

## 🗄️ Seed automat pentru date demo

La fiecare deploy, backend-ul rulează seed-ul care creează:

- 10 produse software
- 10 comenzi cu iteme
- 1 utilizator admin (`admin@admin.com / 123456`)

---

## 🔧 Probleme rezolvate în proiect

- Migrare completă de la baza de date goală → tabele → seed
- Adăugarea constrângerii `@unique` pentru `Product.name`
- Configurare corectă CORS pentru GitHub Pages
- Validare JWT între frontend și backend
- Debugging Render (token invalid, seed, migrare)
- Refactorizare Axios pentru includerea token-ului în toate request-urile

---

## 🎯 Obiectivul proiectului

Acest proiect demonstrează capacitatea de a construi un sistem complet end‑to‑end:

- arhitectură full‑stack
- autentificare sigură
- gestionare date cu Prisma
- UI modern și responsiv
- deploy complet pe platforme gratuite
