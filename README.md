# ⚖️ DH-Avocat Platform – Law Firm Management System

## 📘 Overview

**DH-Avocat Platform** is a modern backend system designed to streamline the operations of a **top-tier law firm**.  
It centralizes document management, invoicing, task assignment, client relations, and reporting — all in one unified platform.

Built with:
- **NestJS** – Scalable backend framework for Node.js
- **Prisma ORM** – Elegant database modeling and querying
- **PostgreSQL** – Reliable, ACID-compliant relational database
- **TypeScript** – Full type safety and maintainable code

---

## 🚀 Key Features

### 👥 User & Role Management
- Supports different roles: `ADMIN`, `BOARD`, `SENIOR`, `MID`, `JUNIOR`, `ASSOCIATE`
- Role-based access and department associations
- Customizable pricing per hour and profiles with avatars

### 🏢 Department Structure
- Manage multiple departments (e.g., Conseil, Fiscalité, Audit)
- Assign managers and collaborators to departments
- Each department has color tagging and internal organization

### 📂 Document Lifecycle Management
- Replace traditional dossiers with **digital documents**
- Link each document to:
  - **Referent** (external reference contact)
  - **Responsable** (internal lawyer or staff)
  - **Client**
  - **Department**
- Upload and reference multiple files per document (contracts, reports, legal notes, etc.)
- Real-time version tracking and audit logs

### 📑 Invoicing & Finance
- Track **time entries** (hours worked per user/task)
- Automatically generate **invoices** with tax calculation
- Associate invoices to clients, documents, and responsible lawyers
- Monitor **invoice status** (paid/unpaid)

### 📆 Task & Time Management
- Assign tasks to collaborators per document (formerly “Milestones”)
- Track task progress and completion
- Record time entries for each task
- Auto-link time entries to invoices

### 📊 Reports & Analytics
- Generate on-demand reports for:
  - A specific document
  - All documents in a department
  - User performance
- Reports include revenue summaries, working hours, and task status

### 📁 File Handling
- Secure file uploads for documents
- Metadata stored in DB (uploader, timestamps, related document)
- Configurable cloud or local storage provider (e.g., AWS S3, Firebase, Cloudinary)

---

## 🧩 System Architecture

