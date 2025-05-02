# GuessWordTiv8
 GuessWordTiv8, (Word Guessing Game)
 Level up your English vocabulary

# File HTML
FIles HTML disimpan di `root folder`

### index.html
 Menu utama game, saat pertama di jalankan akan membuat localStorage `score`, `data-questions`, dan `data-high-score` yang nanti digunakan untuk dimanipulasi di halaman lainnya, saat `index.js` dijalankan

### game-result.html
 Stelah game selesai halaman ini menampilkan score yang didapat, dan menampilkan input untuk nama pemain. Data score didapat dari `localStorage "score"`.
 Setelah user menginput nama pemain maka, cek jika nama pemain yang diinput sudah ada di list high score pemain yang disimpan di `localStorage "data-high-score"` jika iya maka update score pemain tersebut, jika belum tambahkan nama pemain baru beserta scorenya, setelah itu pindah ke halaman `high-score.html`. Untuk logika programnya bisa ditulis di `game-result.js`

### high-score.html
 Halaman high-score menampilkan list high score pemain yang disimpan di `localStorage "data-high-score"` dengan urutan score dari besar ke kecil. Untuk logika programnya bisa ditulis di `high-score.js`

### list-questions.html
 Berisi list pertanyaan, bisa create, read, update, dan delete pertanyaan. Data pertanyaan disimpan di `localStorage "data-questions"`. Untuk logika programnya bisa di tulis di `list-questions-menu.js`


# File JS
File-file js disimpan di `folder js`

### Data-data awal disimpan di folder js
 File data awal untuk list pertanyaan disimpan di `data-questions.js`. File data awal untuk list high score disimpan di `data-high-score.js`. Data-data awal ini nantinya akan disimpan di localStorage saat file `index.js` dijalankan pertama kali.

 