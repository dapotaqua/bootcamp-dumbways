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
        const techs = [...document.querySelectorAll(".form-check-input:checked")]
            .map(cb => cb.nextElementSibling.textContent.trim());

        // ambil gambar dari input file
        const fileInput = document.getElementById("formFile");
        const file = fileInput.files[0];

        const makeCard = (imageBase64 = null) => {
            const card = document.createElement("div");
            card.classList.add("col-md-4");

            const techList = techs.length > 0 ? techs.join(", ") : "None";

            card.innerHTML = `
                <div class="card project-card" style="cursor:pointer">
                    ${imageBase64 ? `<img src="${imageBase64}" class="card-img-top" alt="${name}">` : ""}
                    <div class="card-body">
                        <h5>${name}</h5>
                        <h6 class="text-muted">${startDate} - ${endDate}</h6>
                        <p>${description}</p>
                        <p><strong>Technologies:</strong> ${techList}</p>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </div>
                </div>
            `;

            listProjects.appendChild(card);
            form.reset();

            // tombol delete
            card.querySelector(".delete-btn").addEventListener("click", e => {
                e.stopPropagation();
                card.remove();
            });

            // saat card di klik data masuk ke lokalstorage
            card.querySelector(".project-card").addEventListener("click", () => {
                const projectData = { name, startDate, endDate, description, techs, imageBase64 };
                localStorage.setItem("projectDetail", JSON.stringify(projectData));
                window.location.href = "detail.html";
            });
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = event => makeCard(event.target.result);
            reader.readAsDataURL(file);
        } else {
            makeCard();
        }
    });
});
