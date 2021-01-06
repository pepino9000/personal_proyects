let url = "http://localhost:3000/cancion";
  let tbody = document.getElementById("cuerpo");
  let cancion = document.getElementById("cancion");
  let artista = document.getElementById("artista");
  let tono = document.getElementById("tono");

  let canciones = [];
  window.onload = getData();

  async function getData() {
    await axios.get(url).then((data) => {
      console.log('hola')
      canciones = data.data;
      tbody.innerHTML = "";
      console.log(canciones)
      canciones.forEach((c, i) => {
        tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.cancion}</td>
          <td>${c.artista}</td>
          <td>${c.tono}</td>
          <td>
            <button class="btn btn-warning" onclick="prepararCancion(${i},'${
          c.id
        }')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCancion(${i},'${
          c.id
        }')">Eliminar</button>
          </td>
        </tr>
      `;
      });
    });
    cancion.value = "";
    artista.value = "";
    tono.value = "";
  }

  function nuevaCancion() {
    cancion;
    artista;
    tono;
    let data = {
      cancion: cancion.value,
      artista: artista.value,
      tono: tono.value,
    };
    axios.post(url+'es', data).then(() => getData());
  }

  function eliminarCancion(i, id) {
    axios.delete(url + "?id=" + id).then(() => {
      alert("Canción " + canciones[i].cancion + " eliminada");
      getData();
    });
  }

  function prepararCancion(i, id) {
    cancion.value = canciones[i].cancion;
    artista.value = canciones[i].artista;
    tono.value = canciones[i].tono;
    document
      .getElementById("editar")
      .setAttribute("onclick", `editarCancion('${id}')`);
    document.getElementById("agregar").style.display = "none";
    document.getElementById("editar").style.display = "block";
  }

  function editarCancion(id) {
    axios
      .put(url, {
        cancion: cancion.value,
        artista: artista.value,
        tono: tono.value,
      })
      .then(() => {
        getData();
        document.getElementById("agregar").style.display = "block";
        document.getElementById("editar").style.display = "none";
      });
  }