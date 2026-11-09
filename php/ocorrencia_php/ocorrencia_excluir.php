<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$id = (int) $_GET['id'];

try {
    $stmt = $conexao->prepare("DELETE FROM ocorrencia WHERE id_ocorrencia = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Ocorrência excluída com sucesso.',
        'data' => []
    ];
} catch (Exception $e) {
    
    if ($e->getCode() == 1451) {
        $mensagem = 'Não é possível excluir: esta ocorrência já foi usada em um registro.';
    } else {
        $mensagem = 'Falha ao excluir ocorrência.';
    }

    $retorno = [
        'status' => 'nok',
        'mensagem' => $mensagem,
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);