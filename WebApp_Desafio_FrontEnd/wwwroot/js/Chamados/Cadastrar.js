$(document).ready(function () {

    // Configuração do datepicker
    $('.glyphicon-calendar').closest("div.date").datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'pt-BR'
    });

    // Validação ao clicar no botão Cancelar
    $('#btnCancelar').click(function () {
        Swal.fire({
            html: "Deseja cancelar essa operação? O registro não será salvo.",
            type: "warning",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                history.back();
            } else {
                console.log("Cancelou a inclusão.");
            }
        });
    });

    // Validação ao clicar no botão Salvar
    $('#btnSalvar').click(function () {

        // Verifica se os campos estão válidos
        if ($('#form').valid() != true) {
            FormularioInvalidoAlert();
            return;
        }

        // Verificação se a DataAbertura não é retroativa (data passada)
        let dataAbertura = $('#DataAbertura').val();
        let dataAtual = new Date();

        // Formatação da data selecionada para o formato de comparação
        let dataSelecionada = dataAbertura.split('/');
        // Formato: [dd, mm, yyyy]
        let dataComparada = new Date(dataSelecionada[2], dataSelecionada[1] - 1, dataSelecionada[0]);

        // Ajusta a hora da data atual para comparações sem considerar o horário
        dataAtual.setHours(0, 0, 0, 0);

        // Verifica se a data selecionada é anterior à data atual
        if (dataComparada < dataAtual) {
            Swal.fire({
                text: "A data de abertura não pode ser uma data passada!",
                confirmButtonText: 'OK',
                icon: 'error'
            });
            return; // Impede o envio do formulário
        }

        // Serializa o formulário
        let chamado = SerielizeForm($('#form'));
        let url = $('#form').attr('action');

        // Envia os dados para o servidor
        $.ajax({
            type: "POST",
            url: url,
            data: chamado,
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

});