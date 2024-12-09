$(document).ready(function () {

    var table = $('#dataTables-Departamentos').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: config.contextPath + 'Departamentos/Datatable',
        columns: [
            { data: 'ID' },
            { data: 'Descricao', title: 'Descrição' },
        ],
    });

    // Ação ao clicar na linha da tabela
    $('#dataTables-Departamentos tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Detecta o duplo clique (dblclick) na linha para edição
    $('#dataTables-Departamentos tbody').on('dblclick', 'tr', function () {
        var data = table.row(this).data(); // Pega os dados da linha clicada
        window.location.href = config.contextPath + 'Departamentos/Editar/' + data.ID; // Redireciona para a página de edição
    });

    // Ação para o botão "Adicionar"
    $('#btnAdicionar').click(function () {
        window.location.href = config.contextPath + 'Departamentos/Cadastrar';
    });

    // Ação para o botão "Editar"
    $('#btnEditar').click(function () {
        var data = table.row('.selected').data();
        window.location.href = config.contextPath + 'Departamentos/Editar/' + data.ID;
    });

    // Ação para o botão "Excluir"
    $('#btnExcluir').click(function () {
        var data = table.row('.selected').data();
        let idRegistro = data.ID;
        if (!idRegistro || idRegistro <= 0) {
            return;
        }

        if (idRegistro) {
            Swal.fire({
                text: "Tem certeza de que deseja excluir " + data.Descricao + " ?",
                type: "warning",
                showCancelButton: true,
            }).then(function (result) {

                if (result.value) {
                    $.ajax({
                        url: config.contextPath + 'Departamentos/Excluir/' + idRegistro,
                        type: 'DELETE',
                        contentType: 'application/json',
                        error: function (result) {
                            Swal.fire({
                                text: result,
                                confirmButtonText: 'OK',
                                icon: 'error'
                            });
                        },
                        success: function (result) {
                            Swal.fire({
                                type: result.Type,
                                title: result.Title,
                                text: result.Message,
                            }).then(function () {
                                table.draw();
                            });
                        }
                    });
                } else {
                    console.log("Cancelou a exclusão.");
                }

            });
        }
    });

    // Lógica do botão "Relatório"
    $('#btnRelatorio').click(function () {
        window.location.href = config.contextPath + 'Departamentos/Report';
    });

});