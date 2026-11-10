<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$nome      = trim($_POST['nome'] ?? '');
$descricao = trim($_POST['descricao'] ?? '');
$recurso   = trim($_POST['recurso'] ?? '');
$acao      = trim($_POST['acao'] ?? '');

$acoesValidas = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

try {
    if ($nome === '' || $recurso === '' || $acao === '') {
        throw new InvalidArgumentException('Preencha nome, recurso e ação.');
    }
    if (mb_strlen($nome) > 80 || mb_strlen($recurso) > 80 || mb_strlen($descricao) > 255) {
        throw new InvalidArgumentException('Texto muito longo: nome e recurso até 80 caracteres, descrição até 255.');
    }
    if (!in_array($acao, $acoesValidas, true)) {
        throw new InvalidArgumentException('Ação inválida.');
    }

    // descrição é opcional na tabela (aceita NULL)
    if ($descricao === '') {
        $descricao = null;
    }

    $stmt = $conexao->prepare("
    INSERT INTO permissao (nome, descricao, recurso, acao)
    VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $nome, $descricao, $recurso, $acao);
    $stmt->execute();
    $stmt->close();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Permissão cadastrada com sucesso.',
        'data' => ['id_permissao' => $conexao->insert_id]
    ];
} catch (InvalidArgumentException $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => $e->getMessage(),
        'data' => []
    ];
} catch (Exception $e) {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao cadastrar permissão.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
