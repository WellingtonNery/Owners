<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$nome = $_POST['nome'];
$bloco = $_POST['bloco'];
$andar = $_POST['andar'];

$stmt = $conexao->prepare('INSERT INTO sala (nome, bloco, andar) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $nome, $bloco, $andar);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Sala cadastrada com sucesso.';
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Falha ao cadastrar sala.';
}

$stmt->close();
$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
