<?php
include_once('../conexao.php');
$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$id = (int) $_GET['id'];

$stmt = $conexao->prepare("DELETE FROM usuario WHERE id_usuario = ?");

$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Usuário excluído com sucesso.',
        'data' => []
    ];
} else {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao excluir usuário.',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);