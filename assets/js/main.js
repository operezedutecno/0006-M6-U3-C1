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
                            <td><a href='#' class='btn btn-info'>Ver detalles</a></td>
                        </tr>
                    `);
                })
                console.log(respuesta);
            }
        })
    }
    listar();
})