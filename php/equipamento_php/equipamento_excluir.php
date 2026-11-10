<?php
include_once('../conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $stmt = $conexao->prepare('DELETE FROM equipamento WHERE id_equipamento = ?');
    $stmt->bind_param('s', $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status'] = 'ok';
        $retorno['mensagem'] = 'Equipamento excluido';
    } else {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Equipamento nao excluido';
    }

    $stmt->close();
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'E necessario informar um ID para exclusao';
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
?>