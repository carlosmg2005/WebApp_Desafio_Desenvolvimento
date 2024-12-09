$(document).ready(function () {

    // Ação do botão de cancelar
    $('#btnCancelar').click(function () {
        Swal.fire({
            html: "Deseja cancelar essa operação? O registro não será salvo.",
            type: "warning",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                history.back(); // Volta para a página anterior
            } else {
                console.log("Cancelou a operação.");
            }
        });
    });

    // Ação do botão de salvar
    $('#btnSalvar').click(function () {

        // Valida o formulário
        if ($('#form').valid() != true) {
            FormularioInvalidoAlert();
            return;
        }

        // Validação extra para Descrição (máximo 100 caracteres)
        let descricao = $('#Descricao').val();
        if (descricao.length > 100) {
            Swal.fire({
                text: "A descrição não pode ter mais de 100 caracteres!",
                confirmButtonText: 'OK',
                icon: 'error'
            });
            return; // Impede o envio do formulário
        }

        // Serializa o formulário
        let departamento = SerielizeForm($('#form'));
        let url = $('#form').attr('action');

        // Realiza a requisição AJAX para salvar o departamento
        $.ajax({
            type: "POST",
            url: url,
            data: departamento,
            success: function (result) {
                Swal.fire({
                    type: result.Type,
                    title: result.Title,
                    text: result.Message,
                }).then(function () {
                    window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                });
            },
            error: function (result) {
                Swal.fire({
                    text: result,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });
            },
        });
    });

    // Carregar o departamento (para edição ou visualização)
    function CarregarDepartamento(id) {
        $.ajax({
            type: "GET",
            url: '/departamentos/obter/' + id,
            success: function (result) {
                if (result.Type === 'success') {
                    $('#ID').val(result.Data.ID);
                    $('#Descricao').val(result.Data.Descricao);
                } else {
                    Swal.fire({
                        text: result.Message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    text: 'Erro ao carregar os dados do departamento.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    // Deletar departamento
    $('#btnExcluir').click(function () {
        let id = $('#ID').val();

        Swal.fire({
            html: "Deseja excluir esse departamento?",
            type: "warning",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: '/departamentos/excluir/' + id,
                    success: function (result) {
                        Swal.fire({
                            type: result.Type,
                            title: result.Title,
                            text: result.Message,
                        }).then(function () {
                            window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                        });
                    },
                    error: function (result) {
                        Swal.fire({
                            text: result,
                            confirmButtonText: 'OK',
                            icon: 'error'
                        });
                    }
                });
            } else {
                console.log("Cancelou a exclusão.");
            }
        });
    });

});