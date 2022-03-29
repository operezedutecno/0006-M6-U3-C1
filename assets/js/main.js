$(() => {
    const rutaServidor = "http://localhost:8080";

    $(document).on("click","#btn-registrar", function(){
        if(confirm('¿Seguro que desea registrar una nueva persona?')){
            $.ajax({
                url: `${rutaServidor}/registrar`,
                method: 'get',
                dataType: 'html',
                success: function(respuesta){
                    alert(respuesta);
                    listar();
                }
            })
        }
    })

    $(document).on("click", ".ver-detalles", function(event){
        event.preventDefault();
        let id = $(this).data('id');
        $.ajax({
            url: `${rutaServidor}/consulta/${id}`,
            method: 'get',
            dataType: 'json',
            success: function(respuesta){
                $("#modal-persona .modal-body").html(`
                    <table class='table table-bordered'>
                        <tr>
                            <th>Id</th>
                            <td>${respuesta.id}</td>
                        </tr>
                        <tr>
                            <th>Título</th>
                            <td>${respuesta.name.title}</td>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <td>${respuesta.name.first}</td>
                        </tr>
                        <tr>
                            <th>Apellido</th>
                            <td>${respuesta.name.last}</td>
                        </tr>
                        <tr>
                            <th>País</th>
                            <td>${respuesta.location.country}</td>
                        </tr>
                        <tr>
                            <th>Estado</th>
                            <td>${respuesta.location.state}</td>
                        </tr>
                        <tr>
                            <th>Ciudad</th>
                            <td>${respuesta.location.city}</td>
                        </tr>
                    </table>
                `)
            }
        })
    })

    let listar = () => {
        $.ajax({
            url: `${rutaServidor}/listado`,
            method: 'get',
            dataType: 'json',
            success: function(respuesta){
                $("#actualizacion").html(respuesta.ultima_modificacion);
                $("#tabla-personas tbody").html('');
                respuesta.personas.forEach(persona => {
                    $("#tabla-personas tbody").append(`
                        <tr>
                            <td>${persona.id}</td>
                            <td>${persona.name.title}</td>
                            <td>${persona.name.first}</td>
                            <td>${persona.name.last}</td>
                            <td>${persona.gender}</td>
                            <td><a href='#' class='btn btn-info ver-detalles' data-bs-toggle="modal" data-bs-target="#modal-persona" data-id="${persona.id}">Ver detalles</a></td>
                        </tr>
                    `);
                })
            }
        })
    }
    listar();
})