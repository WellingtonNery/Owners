<?php
include_once('../conexao.php');

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$telefone = $_POST['telefone'];
$pronomes = $_POST['pronomes'];
$tipo = $_POST['tipo'];

try {
    $conexao->begin_transaction();

    $stmt = $conexao->prepare("
    INSERT INTO usuario (nome, cpf, email, senha, telefone, pronomes)
    VALUES (?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssssss", $nome, $cpf, $email, $senha, $telefone, $pronomes);
    $stmt->execute();
    $stmt->close();

    $id_usuario = $conexao->insert_id;

    if ($tipo == 'Aluno'){
        $stmt2 = $conexao->prepare("INSERT INTO aluno (id_usuario) VALUES (?)");
        $stmt2->bind_param("i", $id_usuario);
        $stmt2->execute();
        $stmt2->close();
    } else if ($tipo == 'Professor'){
        $stmt2 = $conexao->prepare("INSERT INTO professor (id_usuario) VALUES (?)");
        $stmt2->bind_param("i", $id_usuario);
        $stmt2->execute();
        $stmt2->close();
    } else if ($tipo == 'Técnico'){
        $stmt2 = $conexao->prepare("INSERT INTO tecnico (id_usuario) VALUES (?)");
        $stmt2->bind_param("i", $id_usuario);
        $stmt2->execute();
        $stmt2->close();
    } else {
        throw new Exception('Tipo de usuário inválido.');
    }

    $conexao->commit();

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Usuário cadastrado com sucesso.',
        'data' => []
    ];
} catch (Exception $e) {
    $conexao->rollback();

    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao cadastrar usuário.',
        'data' => ['erro' => $e->getMessage()]
    ];
}

$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);