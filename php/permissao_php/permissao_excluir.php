<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$id = (int) ($_GET['id'] ?? 0);

try {
    if ($id <= 0) {
        throw new InvalidArgumentException('ID da permissão inválido.');
    }

    $stmt = $conexao->prepare('DELETE FROM permissao WHERE id_permissao = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $excluidas = $stmt->affected_rows;
    $stmt->close();

    if ($excluidas > 0) {
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Permissão excluída com sucesso.',
            'data' => []
        ];
    } else {
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Permissão não encontrada.',
            'data' => []
        ];
    }
} catch (InvalidArgumentException $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => $e->getMessage(),
        'data' => []
    ];
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao excluir permissão.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
