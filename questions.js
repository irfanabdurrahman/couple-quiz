// ===== Couple Quiz — Questions Database =====
// Categories: romantic, funny, deep, would (would-you-rather)
// Each question has multiple-choice options

const QUESTIONS = [
  // ===== ROMANTIC =====
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Apa momen pertama kali ketemu yang paling ingat?',
    options: ['Langsung klik & nyaman', 'Gugup & salah tingkah', 'Nggak ada kesan khusus', 'Baper langsung']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Hal kecil pasangan yang bikin baper?',
    options: ['Pelukan diam-diam', 'Pesan selamat pagi', 'Cengkeraman tangan', 'Ngobrol sampe subuh']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Hadiah apa yang paling berkesan dari pasangan?',
    options: ['Bunga/hadiah fisik', 'Surat tulisan tangan', 'Kencan kejutan', 'Hal simple tp nyenyat']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Gaya cinta utamaku gimana?',
    options: ['Words of affirmation (kata-kata)', 'Quality time (waktu bareng)', 'Physical touch (sentuhan)', 'Acts of service (bantuin)']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Kalau lagi sedih, aku mau pasangan ngapain?',
    options: ['Dipeluk & didengar', 'Dikasih space sendiri', 'Dibuat ketawa', 'Diajak jalan-jalan']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Bulan madu impian di mana?',
    options: ['Pantai tropis (Bali/Maldives)', 'Kota romantis (Paris/Verona)', 'Backpacking Eropa', 'Staycation di kota mewah']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Kalau marah, biasanya aku...',
    options: ['Langsung bilang', 'Diam & nyerang pasif', 'Butuh waktu sendiri', 'Nangis dulu baru ngomong']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Apa lagu yang bikin inget pasangan?',
    options: ['Lagu pop mellow', 'Lagu indie aesthetic', 'Lagu yang pas first date', 'Lagu R&B/soul']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Cara aku nunjukkin sayang paling sering?',
    options: ['Bilang "sayang kamu"', 'Buatin makanan', 'Bantu tugas2 kecil', 'Pelukan & ciuman']
  },
  {
    category: 'romantic',
    emoji: '💕',
    q: 'Tanggal anniversary ideal gimana?',
    options: ['Fine dining mewah', 'Piknik di taman', 'Nonton konser bareng', 'Karaoke/hiburan indoor']
  },

  // ===== FUNNY =====
  {
    category: 'funny',
    emoji: '😂',
    q: 'Posisi tidur paling sering?',
    options: ['Miring ke kiri', 'Miring ke kanan', 'Telentang streght', 'Nge-gulung selimut']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Kebiasaan unik pas bangun pagi?',
    options: ['Snooze alarm 5x', 'Langsung bangun segar', 'Gigit-gigit bantal', 'Cari HP dulu']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Makanan yang paling sering direbut dari pasangan?',
    options: ['Kentang goreng terakhir', 'Gigitan pertama burger', 'Es krim', 'Coklat']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Jenis film yang aku secretly suka?',
    options: ['Rom-com cringe', 'Horror tapi tutup mata', 'Anime', 'Reality show busuk']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Kalau kelaperan parah, mending makan...',
    options: ['Indomie telur', 'Nasi goreng pinggir jalan', 'Seblak level naga', 'Pizza dingin']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Kebiasaan paling nyebelin yang aku akui?',
    options: ['Gigit kuku', 'Bisa rebahan seharian', 'Lupa taruh barang', 'Televisi/volume HP keras']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Reaksi kalau ada kecoak terbang?',
    options: ['Lari teriak', 'Cari alat pembunuh', 'Berkurung di kamar', 'Tenang, biarin aja']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Ghosting type kalau lagi malas sosial?',
    options: ['Slow reply sampe lupa', 'Bilang "ntar ya" lalu hilang', 'Ghost total sampe baper', 'Nggak pernah ghosting']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Topik yang paling sering di-debat berdua?',
    options: ['Mau makan apa', 'Siapa yang benar', 'Arah jalan/Siap nyetir', 'Acara TV/film']
  },
  {
    category: 'funny',
    emoji: '😂',
    q: 'Emoji yang paling sering dipakai?',
    options: ['😂/🤣', '🥺/🥰', '💀/😭', '👍/👌']
  },

  // ===== DEEP =====
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Hal yang paling aku takutin dalam hubungan?',
    options: ['Kehilangan kepercayaan', 'Berubah jadi bosan', 'Jarak & kesibukan', 'Berhenti tumbuh bareng']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Kapan aku merasa paling dicintai pasangan?',
    options: ['Saat aku gagal & dia tetap ada', 'Saat dia inget detail kecil', 'Saat dia sabar dengerin', 'Saat dia korbanin buat aku']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Nilai apa yang paling aku pegang dalam hubungan?',
    options: ['Kejujuran', 'Kesetiaan', 'Kesabaran', 'Kommunikasi terbuka']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Tujuan jangka panjang yang paling aku mau?',
    options: ['Keluarga & anak', 'Karir sukses bareng', 'Travel dunia', 'Ketenangan & kebahagiaan simple']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Apa yang bikin aku bangga sama pasangan?',
    options: ['Cara dia care ke orang', 'Kerja kerasnya', 'Kepribadian/shio nya', 'Bakat/hobinya']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Bagian diri yang paling susah aku perbaiki?',
    options: ['Cemburuan', 'Kemalasan', 'Quick temper', 'Overthinking']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Kalau konflik, langkah pertamaku...',
    options: ['Ngomong langsung', 'Diam mikir dulu', 'Tunggu pasangan mulai', 'Cari win-win solution']
  },
  {
    category: 'deep',
    emoji: '🤔',
    q: 'Kapan terakhir kali aku merasa benar-benar happy bareng?',
    options: ['Baru2 ini (dalam seminggu)', 'Beberapa minggu lalu', 'Lebih dari sebulan', 'Lupa, harus inget lagi']
  },

  // ===== WOULD YOU RATHER =====
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: liburan mewah 3 hari ATAU jalan-jalan hemat 2 minggi?',
    options: ['Mewah 3 hari', 'Hemat 2 minggu', 'Tergantung budget', 'Mewah tp di rumah aja']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: pasangan jago masak ATAU pasangan jago pijet?',
    options: ['Jago masak', 'Jago pijet', 'Dua-duanya dong', 'Nggak penting, asal sayang']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: nikah muda & bareng tumbuh ATAU nikah dewasa & stabil?',
    options: ['Nikah muda', 'Nikah dewasa', 'Tergantung kesiapan', 'Nggak mikir nikah dulu']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: selalu ngerti tanpa kata ATAU selalu jujur walau sakit?',
    options: ['Ngerti tanpa kata', 'Jujur walau sakit', 'Seimbang', 'Tergantung situasi']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: pacar super ganteng/cantik tapi nyebel ATAU biasa tapi super sayang?',
    options: ['Ganteng/cantik nyebel', 'Biasa super sayang', 'Biasa & sayang', 'Sama aja, chemistry lebih penting']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: hidup 100 thn tanpa pasangan ATAU 50 thn bareng pasangan?',
    options: ['100 thn sendiri', '50 thn bareng', 'Nggak mau pilih', 'Tergantung kualitas hidup']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: anniversary di rumah santai ATAU dinner fine dining?',
    options: ['Di rumah santai', 'Fine dining', 'Piknik outdoor', 'Staycation hotel']
  },
  {
    category: 'would',
    emoji: '🤞',
    q: 'Would you rather: pasangan yang pintar ATAU pasangan yang lucu?',
    options: ['Pintar', 'Lucu', 'Pintar & lumayan lucu', 'Lucu & lumayan pintar']
  }
];

// Export for browser
if (typeof window !== 'undefined') {
  window.QUESTIONS = QUESTIONS;
}
