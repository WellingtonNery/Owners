<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$nome = $_POST['nome'];
$bloco = $_POST['bloco'];
$andar = $_POST['andar'];
$id = (int) $_GET['id'];

$stmt = $conexao->prepare('UPDATE sala SET nome = ?, bloco = ?, andar = ? WHERE id_sala = ?');
$stmt->bind_param('sssi', $nome, $bloco, $andar, $id);

if ($stmt->execute()) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Sala atualizada com sucesso.';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Falha ao atualizar sala.';
}

$stmt->close();
$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
