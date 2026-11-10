<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

try {
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
        $stmt = $conexao->prepare('SELECT id_permissao, nome, descricao, recurso, acao FROM permissao WHERE id_permissao = ?');
        $stmt->bind_param('i', $id);
    } else {
        $stmt = $conexao->prepare('SELECT id_permissao, nome, descricao, recurso, acao FROM permissao ORDER BY id_permissao');
    }
    $stmt->execute();
    $resultado = $stmt->get_result();

    $tabela = [];
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }
    $stmt->close();

    if (count($tabela) > 0) {
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Consulta efetuada.',
            'data' => $tabela
        ];
    } else {
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Não há registros',
            'data' => []
        ];
    }
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao consultar permissões.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
