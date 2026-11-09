<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$tipo = $_POST['tipo'];
$descricao = $_POST['descricao'];

try {
    $stmt = $conexao->prepare("INSERT INTO ocorrencia (descricao, tipo) VALUES (?, ?)");
    $stmt->bind_param("ss", $descricao, $tipo);
    $stmt->execute();
    $stmt->close();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Ocorrência cadastrada com sucesso.',
        'data' => []
    ];
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao cadastrar ocorrência.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);