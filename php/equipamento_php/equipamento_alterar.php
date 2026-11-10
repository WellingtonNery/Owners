<?php
include_once('../conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $id_sala_origem = $_POST['id_sala_origem'] ?? '';
    $tipo = $_POST['tipo'] ?? '';

    if (empty($id_sala_origem) || empty($tipo)) {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Sala de origem e tipo sao obrigatorios.';
    } else {
        $stmt = $conexao->prepare('SELECT id_equipamento FROM equipamento WHERE id_equipamento = ?');
        $stmt->bind_param('s', $_GET['id']);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $existe = $resultado->num_rows > 0;
        $stmt->close();

        if ($existe) {
            $stmt = $conexao->prepare('UPDATE equipamento SET id_sala_origem = ?, tipo = ? WHERE id_equipamento = ?');
            $stmt->bind_param('iss', $id_sala_origem, $tipo, $_GET['id']);

            if ($stmt->execute()) {
                $retorno['status'] = 'ok';
                $retorno['mensagem'] = 'Equipamento alterado com sucesso.';
            } else {
                $retorno['status'] = 'nok';
                $retorno['mensagem'] = 'Nao foi possivel alterar o equipamento.';
            }

            $stmt->close();
        } else {
            $retorno['status'] = 'nok';
            $retorno['mensagem'] = 'Equipamento nao encontrado.';
        }
    }
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
?>