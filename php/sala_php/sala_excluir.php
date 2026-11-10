<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$id = (int) $_GET['id'];

$stmt = $conexao->prepare('DELETE FROM sala WHERE id_sala = ?');
$stmt->bind_param('i', $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Sala excluída com sucesso.';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Falha ao excluir sala.';
}

$stmt->close();
$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
