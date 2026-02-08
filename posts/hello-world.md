---
title: "Hello World: Migrasi ke Flat-File CMS"
date: "2026-01-23"
description: "Akhirnya blog ini rilis juga! Dibangun tanpa database, cuma modal Python, Flask dan Markdown. Ini cerita di balik layarnya."
tags: ["flask", "python", "simpel", "markdown"]
---

## Kenapa Gak Pake Database aja?

Jujur, aku kadang ngerasa capek sama database SQL yang ribet. Dan aku baru ingat bahwa Markdown itu bahasa markup ringan (lightweight markup language) yang digunakan untuk memformat teks biasa (plain text) agar mudah diubah menjadi HTML. Akhirnya, Sebagai developer yang suka **kecepatan** dan **penggunaan jangka panjang**, aku mutusin buat pindah ke sistem _Flat-File_ untuk blog diwebsiteku ini.

### Kelebihannya Apa?

1.  **Ngebut**: Gak perlu konek ke MySQL/Postgres.
2.  **Portable**: Tinggal bikin file markdown (.md ) dan copy ke folder `api/posts`. Dan untuk  lokasi direktori posts kedepannya akan aku letakkan di root.
3.  **Developer Friendly**: Nulis blog rasanya kayak ngoding di VS Code.

### Contoh Syntax Highlighting

Dan juga udah support warna-warni kodingan (Syntax Highlighting) otomatis. Cek snippet HTML di bawah ini:

**HTML**
```html
<h1>HELLO BRUHH</h1>
```
**Javascript**
```Javascript
console.log(HELLO BRUHH)
```

Sudah begitu saja, terimakasih telah membaca artikelku. Nantikan artikel lainnya!!