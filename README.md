# Airpaz Checkout Automation Testing

## Deskripsi Proyek

Proyek ini merupakan automation testing untuk menguji proses checkout pada website [Saucedemo](https://www.saucedemo.com/), sebagai bagian dari technical test QA untuk Airpaz. Pengujian dilakukan menggunakan Selenium WebDriver dan Cucumber (Gherkin) dengan bahasa JavaScript (Node.js).

## Tech Stack

- Bahasa: JavaScript (Node.js)
- Framework: Cucumber.js (Gherkin)
- WebDriver: Selenium WebDriver
- Browser: Google Chrome
- Dependency Manager: npm

## Struktur Proyek

```
📦 airpaz
├── features/
│   └── checkout.feature         # Berisi skenario pengujian checkout
├── step_definitions/
│   └── checkoutSteps.js         # Implementasi step Gherkin
├── support/
│   └── driver.js                # Setup dan konfigurasi WebDriver
├── package.json                # File konfigurasi project & dependency
├── README.md                   # Dokumentasi proyek
```

## Instalasi dan Setup

1. Clone Repository
```bash
git clone https://github.com/username/airpaz.git
cd airpaz
```

2. Install Dependencies
```bash
npm install
```

## Menjalankan Pengujian

```bash
npm test
```
Atau:
```bash
npx cucumber-js --require step_definitions/checkoutSteps.js
```

## Skenario Pengujian

### TC001 - Successful checkout with valid information
- Login
- Tambah item ke cart
- Lanjut checkout
- Isi form data valid
- Klik continue & finish
- Expected: User melihat pesan "Thank you for your order"

### TC002 - Checkout with empty fields
- Login + tambah item
- Checkout tanpa isi form
- Expected: Validasi error muncul: "First Name is required"

### TC003 - Cancel checkout before completing
- Login + tambah item
- Masuk checkout → klik Cancel
- Expected: User diarahkan kembali ke cart

### TC004 - Proceed to checkout with empty cart (Bug)
- Login → langsung ke cart tanpa item
- Klik checkout
- Bug: User tetap bisa lanjut ke halaman pengisian informasi

### TC005 - [BUG] System allows completing checkout with empty cart
- Login → cart kosong → isi form → klik finish
- Bug: User tetap melihat pesan sukses meskipun tidak ada item

## Catatan Tambahan

- File test case dan bug report tersedia dalam spreadsheet.
- Video evidence menunjukkan bug pada checkout tanpa item.
- Semua skenario telah tervalidasi menggunakan automation script.

## Troubleshooting

- Pastikan Chrome versi terbaru sudah terinstal
- Jika ChromeDriver tidak terbuka: periksa path dan izin akses browser

---

## Kontak
Heru Bagus A. P.  
Technical Test QA - April 2025

