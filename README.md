# 🏠 Estato Marketplace

A modern full-stack real-estate marketplace platform inspired by online classified marketplaces, built to help users **discover, list, buy, and sell properties online**.

Estato is initially focused on the **real-estate market**, with the architecture designed to expand into other categories such as **cars, bikes, electronics, and general products** in the future.

---

## 🚀 Features

### 👤 User Features

* User registration and authentication
* User profile management
* Create and manage property listings
* Upload property images
* Edit and delete listings
* Contact sellers
* Browse available properties

### 🏡 Property Marketplace

* Property listing management
* Property categories
* Location-based listings
* Search properties
* Filter properties by:

  * Location
  * Property type
  * Price
  * Bedrooms
  * Area
* Property details page
* Seller information

### 🔎 Search & Discovery

* Fast property search
* Advanced filtering
* Category-based browsing
* Location-based discovery
* Responsive property cards

### 🔐 Security

* User authentication
* Protected API endpoints
* Secure backend architecture
* Environment-based configuration

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Python
* Django
* Django REST Framework

### Database

* PostgreSQL / SQLite

### Development Tools

* Git
* GitHub
* VS Code
* REST APIs

---

## 🏗️ Project Architecture

```text
Estato Marketplace
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── apps/
│   ├── models/
│   ├── serializers/
│   ├── views/
│   └── urls/
│
├── media/
├── static/
├── .env.example
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Nikhil-s2909/estato-marketplace.git
cd estato-marketplace
```

---

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend will be available at:

```text
http://127.0.0.1:8000/
```

---

### 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173/
```

---

## 🔑 Environment Variables

Create a `.env` file for environment-specific configuration.

Example:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
API_URL=http://127.0.0.1:8000
```

> Never commit passwords, API keys, secret keys, or other sensitive credentials to GitHub.

---

## 📱 Future Roadmap

Estato is being developed with future marketplace expansion in mind.

### Phase 1 — Real Estate

* [x] Property listings
* [x] Property browsing
* [ ] Advanced search
* [ ] Seller dashboard
* [ ] Buyer dashboard
* [ ] Property favorites
* [ ] Chat between buyers and sellers

### Phase 2 — Marketplace Expansion

* [ ] Cars
* [ ] Bikes
* [ ] Electronics
* [ ] Furniture
* [ ] Jobs
* [ ] General products

### Phase 3 — Mobile Applications

* [ ] Android application
* [ ] iOS application
* [ ] Push notifications
* [ ] Mobile seller dashboard
* [ ] Mobile buyer experience

---

## 🎯 Project Vision

The goal of Estato is to build a **scalable marketplace platform** where individuals and businesses can easily list products or services while buyers can discover and connect with sellers.

The platform starts with real estate and is designed to evolve into a broader **multi-category marketplace**.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 📄 License

This project is currently intended for development and commercial use by the project owner.

---

## 👨‍💻 Developer

**Nikhil**

Full Stack Python Developer
Project Manager — Agileinfo Techytern Solutions LLP

GitHub:
https://github.com/Nikhil-s2909

---

⭐ If you find this project useful, consider giving the repository a star.
