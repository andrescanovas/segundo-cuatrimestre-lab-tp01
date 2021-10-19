const d = document,
      $table = d.querySelector(".crud-table"),
      $form = d.querySelector(".crud-form"),
      $title = d.querySelector(".crud-title"),
      $template = d.getElementById("crud-template").content,
      $fragment = d.createDocumentFragment();
      
     
      // Peticion Asicrona de la libreria Axios    

        
axios.get("http://localhost:3000/personajes/")

.then ((res)=>{
    
    // console.log(res)

    let jsondata = res.data;

        console.log(jsondata);
        jsondata.forEach(elemento => {
            // ESTOS DATOS HACEN REFERENCIA A LOS DEL ARCHIVO index TIP(1) 
          $template.querySelector(".nombre").textContent = elemento.nombre;
          $template.querySelector(".apellido").textContent = elemento.apellido;
          $template.querySelector(".serie").textContent = elemento.serie;
          $template.querySelector(".edit").dataset.id = elemento.id;
          $template.querySelector(".edit").dataset.nombre = elemento.nombre;
          $template.querySelector(".edit").dataset.apellido = elemento.apellido;
          $template.querySelector(".edit").dataset.serie = elemento.serie;
          $template.querySelector(".delete").dataset.id = elemento.id;

          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });
        // Aca se guarda la info en la variable $table que esta arriba y la manda a <table>//<tbody></tbody> en el html 
        $table.querySelector("tbody").appendChild($fragment);
      })
      
      .catch((err)=>{
          let message = err.statusText || "Ocurrió un error";
          $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
        })
        
        .finally()
        
// d.addEventListener("DOMContentLoaded", gerAll);

d.addEventListener("submit", async e => {
    if (e.target === $form) {
    // Consultar sobre la linea 41(e.preventDefault();)
    e.preventDefault();

    if (!e.target.id.value) {
    //Crear - POST
    try {
        let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify({
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            serie: e.target.serie.value
        })
        },
        res = await axios("http://localhost:3000/personajes", options),
        json = await res.data;

    location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
    } 
    
    else {
    //Update - PUT
    try {
        let options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        data: JSON.stringify({
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            serie: e.target.serie.value
        })
        },
        res = await axios(`http://localhost:3000/personajes/${e.target.id.value}`, options),
        json = await res.data;


        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message}</b></p>`);
    }
    }
}
});

d.addEventListener("click", async e => {
if (e.target.matches(".edit")) {
    $title.textContent = "Editar Informacion de Personajes";
    $form.nombre.value = e.target.dataset.nombre;
    $form.apellido.value = e.target.dataset.apellido;
    $form.serie.value = e.target.dataset.serie;
    $form.id.value = e.target.dataset.id;
}

if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿Estás seguro de eliminar el personaje id ${e.target.dataset.id} $?`);

    if (isDelete) {
    //Delete - DELETE
    try {
        let options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
        },
        res = await axios(`http://localhost:3000/personajes/${e.target.dataset.id}`, options),
        json = await res.data;


        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
    }
    }
}
})
