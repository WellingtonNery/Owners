<?php
include_once('../conexao.php');
$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$pronomes = $_POST['pronomes'];
$id = (int) $_GET['id'];

if ($_POST['senha'] != '') {
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $stmt = $conexao->prepare("
    UPDATE usuario SET
    nome = ?, cpf = ?, email = ?, senha = ?, telefone = ?, pronomes = ?
    WHERE id_usuario = ?");

    $stmt->bind_param("ssssssi", $nome, $cpf, $email, $senha, $telefone, $pronomes, $id);
} else{
     $stmt = $conexao->prepare("
    UPDATE usuario SET
    nome = ?, cpf = ?, email = ?, telefone = ?, pronomes = ?
    WHERE id_usuario = ?");

    $stmt->bind_param("sssssi", $nome, $cpf, $email, $telefone, $pronomes, $id);
}
$stmt->execute();


if ($stmt->affected_rows > 0) {
    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Usuário atualizado com sucesso.',
        'data' => []
    ];
} else {
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Falha ao atualizar usuário.',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();
header("Content-Type: application/json; charset=utf-8");
echo json_encode($retorno);