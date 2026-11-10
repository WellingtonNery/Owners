<?php
include_once('../conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$stmt = $conexao->prepare('SELECT id_sala, nome FROM sala ORDER BY nome');
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
    $retorno['mensagem'] = 'Nao ha salas cadastradas';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
?>