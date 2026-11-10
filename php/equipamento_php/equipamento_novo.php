<?php
include_once('../conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$id_equipamento = $_POST['id_equipamento'] ?? '';
$id_sala_origem = $_POST['id_sala_origem'] ?? '';
$tipo = $_POST['tipo'] ?? '';

if (empty($id_equipamento) || empty($id_sala_origem) || empty($tipo)) {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Nome, sala de origem e tipo sao obrigatorios.';
} else {
    $stmt = $conexao->prepare('SELECT id_equipamento FROM equipamento WHERE id_equipamento = ?');
    $stmt->bind_param('s', $id_equipamento);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $existe = $resultado->num_rows > 0;
    $stmt->close();

    if ($existe) {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Ja existe um equipamento com esse nome.';
    } else {
        $stmt = $conexao->prepare('INSERT INTO equipamento (id_equipamento, id_sala_origem, tipo) VALUES (?, ?, ?)');
        $stmt->bind_param('sis', $id_equipamento, $id_sala_origem, $tipo);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno['status'] = 'ok';
            $retorno['mensagem'] = 'Equipamento cadastrado com sucesso.';
        } else {
            $retorno['status'] = 'nok';
            $retorno['mensagem'] = 'Falha ao cadastrar o equipamento.';
        }

        $stmt->close();
    }
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
?>