function ejecutarApi(){
    let url = "https://moviesdatabase.p.rapidapi.com/titles/utils/genres"
    fetch (url , {
        headers: {
            'X-RapidAPI-Key': 'ac24e98936mshca1ca4c93046170p1b5fefjsn1aa30db1e4c2',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

        const mostrarData = (data) =>{
            console.log(data.results.length);
            console.log(data.results);
            var rta = "<div class='row'>";
            for (let i = 0; i < data.results.length; i++) {
                if (data.results[i] != undefined) {
                    if (data.results[i] != null) {
                        var genero = data.results[i]; // Obtén el nombre del género
                        rta += 
                            "<div class='col-sm-6'>"+
                                "<div class='card text-center border-primary mb-3'>" +
                                    "<div class='card-body'>" +           
                                    "<span></span>"+
                                    "<span></span>"+
                                    "<span></span>"+
                                    "<span></span>"+
                                        "<h5 class='card-title'>" + genero + "</h5>" +
                                        "<p class='card-text'>Las mejores películas del Género</p>" +
                                        "<button href='peliculas.html' class='btn btn-primary' onclick='verPeliculas2(\"" + genero + "\")'>Ver Películas</button>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
                    }
                }
                
            }
            rta += "</div>";
            document.getElementById("demo").innerHTML = rta;
        }
    
}
function verPeliculas2(genero) {
    // Redirigir a la página de películas.html con el género como parámetro en la URL
    window.location.href = `peliculas.html?genero=${genero}`;
}
function verPeliculas(){
    const urlParams = new URLSearchParams(window.location.search);
    const genero = urlParams.get('genero');
    let urlCatalogo = `https://moviesdatabase.p.rapidapi.com/titles?genre=${genero}`;
    console.log(urlCatalogo);
    
    fetch (urlCatalogo , {
        headers: {
            'X-RapidAPI-Key': 'ac24e98936mshca1ca4c93046170p1b5fefjsn1aa30db1e4c2',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))
        
        const mostrarData = (data) =>{
            console.log(data.results.length);
            var rta="<div class ='row'>";
            var urlImagen = "img/Noencontrada.jpg";         
            for(let i=0;i<data.results.length;i++){
                if (data.results[i] != undefined) {
                    if (data.results[i] != null) {
                        rta += "<div class='col-sm-3'>"+
                               "<div class='card' style='width: 240px;'>"; 
                          if (data.results[i].primaryImage != null) {
                              rta += "<img class='card-img-top' src='"+ data.results[i].primaryImage.url+ "' alt='Imagen Pelicula'>";
                          }
                          else{
                            rta += "<img class='card-img-top' src='https://img.freepik.com/vector-gratis/ilustracion-concepto-error-403-prohibido-policia_114360-1935.jpg' alt='Imagen Pelicula'>";
                          }
                    }
                    let rlDocu = `https://moviesdatabase.p.rapidapi.com/titles/${data.results[i].id}`;
                    console.log(rlDocu); 
                    rta += "<div class='card-body'>" +
                                "<h5 class='card-title'>" + data.results[i].originalTitleText.text + "</h5>" +
                                "<p class='card-text'>Las mejores películas del Género</p>" +
                                "<center><button type='button' class='btn btn-primary' "+
                                "data-toggle='modal' data-target='#exampleModalLong' "+
                                "onclick='verDetalles(\"" + rlDocu + "\")'> " +
                                "Ver Detalles</button></center>" +
                            "</div>" +
                        "</div>" +
                      "</div>";

                }  
                               
            }
            rta += "</div>";
            document.getElementById("catalogo").innerHTML = rta;
        }
        
        let alement = document.getElementById('titulo')
        alement.innerHTML = `<div class="nameGenero">Peliculas de ${genero}</div>`
}

function verDetalles(url) {
    console.log(url)
    fetch (url , {
        headers: {
            'X-RapidAPI-Key': 'ac24e98936mshca1ca4c93046170p1b5fefjsn1aa30db1e4c2',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

        const mostrarData = (data) => {
            console.log(data.results.originalTitleText.text);   
            frmComprar.nombre.value = data.results.originalTitleText.text;
            frmComprar.descripcion.value = data.results.primaryImage.caption.plainText;
            frmComprar.fechaSalida.value = data.results.releaseDate.day + "/" + data.results.releaseDate.month + "/" + data.results.releaseDate.year;       
            const imgElement = document.getElementById('imgElementId'); 

            // Establece la URL de la imagen como src 
            imgElement.src = data.results.primaryImage.url;
            
        }  

}

let peliculasFavoritas = [];

function agregarALista() {
    var nombrePelicula  = frmComprar.nombre.value;
    var caption = frmComprar.descripcion.value;
    var imgElement = document.getElementById('imgElementId');
    var urlImagen = imgElement.src;
    console.log(urlImagen);
    const peliculaFav = {
        nombre : nombrePelicula,
        info : caption,
        imagen : urlImagen
    };
    
    // Obtener el contador actual del carrito del localStorage
    var contador = parseInt(localStorage.getItem("contador")) || 0;
    
    var productoRepetido = false;
    
    for (let i = 1; i <= contador; i++) {
        let txt = localStorage.getItem("pelicula" + i);
        if (txt) {
            const peliculaTren = JSON.parse(txt);
            if (peliculaTren.nombre === peliculaFav.nombre) {
                productoRepetido = true;
                break;
            }
        }
    }
    
    if (productoRepetido) {
        alert("Pelicula Repetida");
    } else {
        // Incrementar el contador
        contador++;
    
        // Guardar el producto en el localStorage con una clave única
        localStorage.setItem("pelicula" + contador, JSON.stringify(peliculaFav));
    
        // Actualizar el contador en el localStorage
        localStorage.setItem("contador", contador);
    
        alert("Pelicula Agregada")
    }
     
}

function mostrarFavoritos(){
    var respuesta = "<div class ='row'>";
    if (localStorage.length > 0) {
        var suma = 0;
        for(let i=1; i<= localStorage.length; i++){             
            let txt = localStorage.getItem("pelicula" + i);            
            if (txt === undefined ){
                console.log("Error: " + i);
            }else {
                const peliculaPos = JSON.parse(txt);  
                console.log(peliculaPos);
                if (peliculaPos!=null){
                    console.log(peliculaPos.imagen)
                    respuesta +=  
                            "<div class='col-sm-3'>"+
                                "<div class='card' style='width: 240px;'>"+
                                    "<img class='card-img-top' src='"+ peliculaPos.imagen + "' alt='Imagen Pelicula'>" +
                                    "<div class='card-body'>" +
                                    "<span></span>"+
                                    "<span></span>"+
                                    "<span></span>"+
                                    "<span></span>"+ 
                                        "<h5 class='card-title'>" + peliculaPos.nombre + "</h5>" +
                                        "<p class='card-text'>"+ peliculaPos.info + "</p>" +
                                    "</div>" +
                                    "<center><button type='button' id='bo' class='btn btn-primary' "+
                                    "onclick='eliminarPelicula(\"" + peliculaPos.nombre + "\")'> " +
                                    "Eliminar de Lista</button></center>" +
                                "</div>" +
                            "</div>";
                }
            }
         }
    }

    document.getElementById("favoritosss").innerHTML = respuesta;

}

function eliminarPelicula(nombre) {
    console.log("Eliminando película:", nombre);

    for (let i = 1; i <= localStorage.length; i++) {
        let key = localStorage.key(i - 1);
        if (key && key.startsWith("pelicula")){
            let txt = localStorage.getItem(key);
            if (txt) {
                const peliculaPos = JSON.parse(txt);
                if (peliculaPos && peliculaPos.nombre === nombre) {
                    localStorage.removeItem(key);
                    mostrarFavoritos();
                    console.log("Película eliminada:", nombre);
                    return;
                }
            }
        }
    }
}

function vaciarLista(){    
    console.log("Borrado");
    window.localStorage.clear();        
    console.log(localStorage.length);
}

    
  
  
  