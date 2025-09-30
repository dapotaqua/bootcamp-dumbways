// ketika halaman me refresh
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("projectForm");
    const listProjects = document.querySelector(".list-projects");

    // waktu form di submit
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        // ambil data dari form
        const name = document.getElementById("project name").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const description = document.getElementById("exampleFormControlTextarea1").value;

        // ambil data checkbox yg dicentang
        const techCheckboxes = document.querySelectorAll(".form-check-input:checked");
        let techs = [];
        techCheckboxes.forEach(cb => {
            techs.push(cb.nextElementSibling.textContent.trim()); 
        });

        // ambil gambar dari input file
        const fileInput = document.getElementById("formFile");
        const file = fileInput.files[0];

        // kalau ada gambar yg diupload
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageBase64 = event.target.result; // gambar diubah ke base64

                // bikin card project
                const card = document.createElement("div");
                card.classList.add("col-md-4");
                card.innerHTML = `
                    <div class="card project-card" style="cursor:pointer">
                        <img src="${imageBase64}" class="card-img-top" alt="${name}">
                        <div class="card-body">
                        <h5>${name}</h5>
                        <h6 class="text-muted">${startDate} - ${endDate}</h6>
                        <p>${description}</p>
                        <p><strong>Technologies:</strong> ${techs.join(", ") || "None"}</p>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                        </div>
                    </div>
                    `;

                listProjects.appendChild(card); // card ditambahin ke list
                form.reset(); // reset form setelah submit

                // tombol delete di card
                card.querySelector(".delete-btn").addEventListener("click", function (event) {
                    event.stopPropagation(); // biar klik delete nggak kebaca sebagai klik card
                    card.remove(); // hapus card
                });

                // kalau card di klik, simpan data ke localStorage trus pindah ke detail.html
                card.querySelector(".project-card").addEventListener("click", function () {
                    const projectData = {
                        name,
                        startDate,
                        endDate,
                        description,
                        techs,
                        imageBase64
                    };
                    localStorage.setItem("projectDetail", JSON.stringify(projectData));
                    window.location.href = "detail.html";
                });
            };
            reader.readAsDataURL(file); // mulai convert gambar ke base64
        } else {
            // kalau user nggak masukin gambar
            const card = document.createElement("div");
            card.classList.add("col-md-4");
            card.innerHTML = `
        <div class="card project-card" style="cursor:pointer">
          <div class="card-body">
            <h5>${name}</h5>
            <h6 class="text-muted">${startDate} - ${endDate}</h6>
            <p>${description}</p>
            <p><strong>Technologies:</strong> ${techs.join(", ") || "None"}</p>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
          </div>
        </div>
      `;

            listProjects.appendChild(card);
            form.reset();

            // tombol hapus
            card.querySelector(".delete-btn").addEventListener("click", function (event) {
                event.stopPropagation();
                card.remove();
            });

            // klik card → simpan ke localStorage → buka detail.html
            card.querySelector(".project-card").addEventListener("click", function () {
                const projectData = { name, startDate, endDate, description, techs };
                localStorage.setItem("projectDetail", JSON.stringify(projectData));
                window.location.href = "detail.html";
            });
        }
    });
});
