<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $stmt = $conexao->prepare('SELECT id_sala, nome, bloco, andar FROM sala WHERE id_sala = ?');
    $stmt->bind_param('i', $id);
} else {
    $stmt = $conexao->prepare('SELECT id_sala, nome, bloco, andar FROM sala');
}
$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data'] = $tabela;
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Não há registros';
}

$stmt->close();
$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
