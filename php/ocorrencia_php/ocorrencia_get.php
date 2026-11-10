<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

try {
    $resultado = $conexao->query("SELECT id_ocorrencia, descricao, tipo FROM ocorrencia ORDER BY id_ocorrencia");

    $tabela = [];
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }

    if (count($tabela) > 0) {
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Consulta efetuada.',
            'data' => $tabela
        ];
    } else {
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Não há registros',
            'data' => []
        ];
    }
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao consultar ocorrências.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);