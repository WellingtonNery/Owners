<?php
include_once('../conexao.php');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$id        = (int) ($_GET['id'] ?? 0);
$nome      = trim($_POST['nome'] ?? '');
$descricao = trim($_POST['descricao'] ?? '');
$recurso   = trim($_POST['recurso'] ?? '');
$acao      = trim($_POST['acao'] ?? '');

$acoesValidas = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

try {
    if ($id <= 0) {
        throw new InvalidArgumentException('ID da permissão inválido.');
    }
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
    UPDATE permissao SET
    nome = ?, descricao = ?, recurso = ?, acao = ?
    WHERE id_permissao = ?");
    $stmt->bind_param('ssssi', $nome, $descricao, $recurso, $acao, $id);
    $stmt->execute();
    $stmt->close();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Permissão atualizada com sucesso.',
        'data' => []
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
        'mensagem' => 'Falha ao atualizar permissão.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno);
