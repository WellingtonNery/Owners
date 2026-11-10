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
$id = (int) $_GET['id'];

try {
    $stmt = $conexao->prepare("
    UPDATE ocorrencia SET
    descricao = ?, tipo = ?
    WHERE id_ocorrencia = ?");
    $stmt->bind_param("ssi", $descricao, $tipo, $id);
    $stmt->execute();
    $stmt->close();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Ocorrência atualizada com sucesso.',
        'data' => []
    ];
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao atualizar ocorrência.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);