// Variabel Bagian Kalkulator
const kalkulator = document.querySelector(".kalkulator");
const notice = document.querySelector(".notice");
const pria = document.querySelector("#pria");
const wanita = document.querySelector("#wanita");
const berat = document.querySelector("#berat");
const tinggi = document.querySelector("#tinggi");
const hitung = document.querySelector("#hitung");
const ulangi = document.querySelector("#ulangi");
const theme = document.querySelector(":root");

// Variabel Bagian Hasil BMI
const total = document.querySelector(".total");
const kategori = document.querySelector(".kategori");
const risiko = document.querySelector(".risiko");
const listPenyakit = document.querySelector(".list-penyakit");
const saran = document.querySelector(".saran");

// fungsi setelan default
function defaultSet() {
  pria.checked = true;
}
defaultSet();

// mengatur theme color sesuai gender user
let gender = "";
function cekGender() {
  if (pria.checked == true) {
    gender = "pria";
    theme.style.setProperty("--primary", "royalblue");
  } else if (wanita.checked == true) {
    gender = "wanita";
    theme.style.setProperty("--primary", "mediumvioletred");
  }
}

// handler ketika user klik button Hitung
hitung.addEventListener("click", function (e) {
  // untuk mencegah reload halaman / event bawaan
  e.preventDefault();

  // isi form dimasukan kedalam object agar mudah dalam pengambilan nilai
  let hasil = {
    berat: berat.value,
    tinggi: tinggi.value,
  };

  // validasi input
  let inputKosong = hasil.berat == "" || hasil.tinggi == "";
  let angkaPertama =
    hasil.berat.charAt(0) == 0 ||
    hasil.tinggi.charAt(0) == 0 ||
    hasil.berat.includes("-") ||
    hasil.tinggi.includes("-");
  if (inputKosong) {
    notice.textContent = "Berat dan Tinggi badan wajib diisi!";
  } else if (angkaPertama) {
    notice.textContent = "Angka pertama tidak boleh 0 atau -";
  } else {
    hitungBMI(hasil.berat, hasil.tinggi);
    console.log(hasil);
    kalkulator.classList.add("up");
    notice.textContent = "";
  }
});

// fungsi yang berisi proses perhitungan, pengkondisian dan manipulasi DOM
function hitungBMI(berat, tinggi) {
  let gejala = [];
  // rumus BMI = berat / tinggi(diubah ke meter) ** 2
  // membulatkan angka dibelakang desimal dengan tofixed(1)
  // parseFloat untuk mengubah string menjadi number
  let BMI = parseFloat((berat / (tinggi / 100) ** 2).toFixed(1));
  console.log(BMI);
  total.textContent = `${BMI}`;
  let risikoPenyakit = (risiko.textContent =
    "Dapat berisiko memicu penyakit :");
  if (BMI < 18.5) {
    kategori.textContent = "Kekurangan berat badan";
    console.log("kurus");
    risikoPenyakit;
    gejala = ["Infertilitas", "Anemia", "Osteoporosis", "Sistem imun lemah"];
    gejala.forEach((p) => {
      listPenyakit.innerHTML += `<li>${p}</li>`;
    });
    saran.textContent =
      "Cara terbaik menaikan berat badan yaitu Menerapkan pola makan yang teratur dengan mengonsumsi makanan yang padat kalori dan nutrisi";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    kategori.textContent = "Berat badan ideal";
    risiko.textContent = "Jaga terus gaya hidup sehatmu";
    saran.textContent =
      "Pastikan asupan kalori sesuai dengan kebutuhan kalori harian & konsumsi makanan sehat";
    console.log("ideal");
  } else if (BMI > 24.9 && BMI <= 29.9) {
    kategori.textContent = "Kelebihan berat badan";
    console.log("kelebihan berat badan");
    risikoPenyakit;
    gejala = ["Diabetes", "Hipertensi", "Sakit Jantung", "Osteoarthritis"];
    gejala.forEach((p) => {
      listPenyakit.innerHTML += `<li>${p}</li>`;
    });
    saran.textContent =
      "Utamakan gaya hidup sehat seperti berolahraga dan memperhatikan kadar konsumsi kalor harian untuk mengurangi berat badan berlebih";
  } else if (BMI > 29.9) {
    kategori.textContent = "Obesitas";
    console.log("obesitas");
    risikoPenyakit;
    gejala = ["Diabetes", "Hipertensi", "Sakit Jantung", "Osteoarthritis"];
    gejala.forEach((p) => {
      listPenyakit.innerHTML += `<li>${p}</li>`;
    });
    saran.textContent =
      "Cara terbaik untuk menurunkan berat badan adalah dengan mengatur jumlah kalor pada makanan yang dikonsumsi dan berolahraga";
  } else {
    total.textContent = "angka tidak valid";
    risiko.textContent = "";
  }
}

// handler ketika user klik button Hitung Ulang
ulangi.addEventListener("click", function (e) {
  e.preventDefault();
  kalkulator.classList.remove("up");
  listPenyakit.innerHTML = "";
});
