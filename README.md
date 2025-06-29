# 🔧 Hardware Asset Management

A full-featured web application designed for efficient tracking and administration of hardware assets, user roles, projects, and hardware allocation—tailored for enterprise-scale use in domains like R&D, automotive engineering, and IT infrastructure.

---

## 🚀 Features

- **🔐 Secure Login & Role-Based Access**
- **👤 My Profile Management**
- **🏗️ Project Assignment & Tracking**
- **👥 User Registration Approval**
- **💻 Hardware Inventory & Status Updates**
- **📋 Hardware Request Lifecycle**
- **📑 Audit Trail with Timestamps**
- **⚙️ Angular Material UI with Expandable Rows**

---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | Angular + Material |
| Backend       | Spring Boot (REST) |
| Auth          | JWT Token Security |
| Database      | PostgreSQL / MySQL |
| CI/CD         | Jenkins + JFrog Artifactory |

---

## 📂 Project Structure

```bash
hardware-management/
├── backend/           # Spring Boot backend
│   └── src/main/java/
├── frontend/          # Angular frontend
│   └── src/app/
├── database/          # DB schema or migrations
├── README.md
```

---

## 💻 Getting Started

### Backend
```bash
cd backend
mvn clean install
java -jar target/hardware-management.jar
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

Then visit: `http://localhost:4200`

---

## 📸 Screenshots

_(Optional UI previews here if needed)_

---

## 🤝 Contributing

PRs welcome! Submit issues for bugs, enhancements, or questions.

---

## 📄 License

Licensed under the MIT License.

