const dataDummy = [
    {
        id: 1,
        title: "E-Commerce Web App 2022",
        gambar: "assets/img/ecommerce.jpg",
        durasi: "Durasi : 6 Bulan",
        text: "Website toko online dengan fitur pembayaran, keranjang belanja, dan integrasi ongkir otomatis.",
        icon: ["fa-brands fa-react", "fa-brands fa-node-js", "fa-brands fa-aws"]
    },
    {
        id: 2,
        title: "Travel Booking App 2023",
        gambar: "assets/img/travel.jpg",
        durasi: "Durasi : 4 Bulan",
        text: "Aplikasi pemesanan tiket pesawat dan hotel dengan integrasi API maskapai dan pembayaran online.",
        icon: ["fa-brands fa-android", "fa-brands fa-laravel", "fa-brands fa-square-js"]
    },
    {
        id: 3,
        title: "Healthcare Dashboard",
        gambar: "assets/img/healthcare.jpg",
        durasi: "Durasi : 2 Bulan",
        text: "Dashboard monitoring pasien real-time, lengkap dengan grafik kesehatan dan notifikasi darurat.",
        icon: ["fa-brands fa-angular", "fa-brands fa-python", "fa-solid fa-database"]
    },
    {
        id: 4,
        title: "Portfolio Website 2024",
        gambar: "assets/img/portfolio.jpg",
        durasi: "Durasi : 1 Bulan",
        text: "Website personal untuk menampilkan karya, blog, serta informasi kontak dengan desain modern.",
        icon: ["fa-brands fa-html5", "fa-brands fa-css3-alt", "fa-brands fa-square-js"]
    },
    {
        id: 5,
        title: "Restaurant Mobile App",
        gambar: "assets/img/restaurant.jpg",
        durasi: "Durasi : 3 Bulan",
        text: "Aplikasi pemesanan makanan online dengan fitur menu digital, review pelanggan, dan tracking pesanan.",
        icon: ["fa-brands fa-vuejs", "fa-brands fa-php", "fa-brands fa-bootstrap"]
    }
];

const containerListProjects = document.querySelector(".list-projects");

const cardProjects = dataDummy.map(dd =>
    `<div class="col-lg-4">
        <div class="card text-start">
            <img src="${dd.gambar}" class="card-img-top" alt="${dd.title}">
            <div class="card-body">
                <h5 class="card-title">${dd.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${dd.durasi}</h6>
                <p class="card-text">${dd.text}</p>
                ${dd.icon.map(i => `<i class="${i} fs-2 mb-4 mx-2"></i>`).join("")}
                <div class="btn-group w-100">
                    <a href="detail.html" class="btn btn-dark mx-1">Detail</a>
                    <a href="#" class="btn btn-dark mx-1">Delete</a>
                </div>
            </div>
        </div>
    </div>`
).join("");

containerListProjects.innerHTML = cardProjects;