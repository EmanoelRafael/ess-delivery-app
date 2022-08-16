Feature: "Notificação de Confirmacao de Pedido"

    As a cliente com um pedido pronto para confirmação ou cancelamento
    I want to receber um email confirmando a operação realizada
    So That I posso confirmar e comprovar que meu pedido foi feito, ou cancelado

    Scenario: "Confirmação de Pedido Enviada com Sucesso"
        Given Eu estou na pagina de "Carrinho" logado como "Emanoel Rafael"
        And Tenho o email "emanoelrafael2020@gmail.com" cadastrado
        And Todos os meus dados de pagamento foram aprovados
        When Eu clico no botão "finalizar compra"
        And na janela "Confirmar Pedido" eu clico em "Sim"
        Then Uma janela com uma mensagem de confirmação aparece na tela
        And Eu recebo uma mensagem com os dados do pedido no email cadastrado
        And Eu sou redirecionado para a tela de "Meus Pedidos"

    Scenario: "Confirmação de Cancelamento de Pedido Enviada com Sucesso"
        Given Eu estou na página de "Meus Pedidos" logado como "Emanoel Rafael"
        And Tenho o email "emanoelrafael2020@cin.ufpe.br" cadastrado
        And Tenho um pedido "Camisa Marvel" realizado e em andamento
        When Eu clico no botão "Cancelar Pedido"
        And na janela "Confirmar Cancelamento de Pedido" eu clico em "Sim"
        Then Uma janela com uma mensagem de confirmação aparece na tela
        And Eu recebo uma mensagem com os dados do pedido cancelado no email cadastrado
    
    Scenario: "Confirmação de Pedido não Enviada por Email Inválido"
        Given Eu estou na pagina de "Carrinho" logado como "Emanoel Rafael"
        And Tenho o email "emanoelrafael2020@gmail" cadastrado
        And Todos os meus dados de pagamento foram aprovados
        When Eu clico no botão "finalizar compra"
        And na janela "Confirmar Pedido" eu clico no botão "Sim"
        Then Uma janela com uma mensagem informando que não foi possivel realizar o pedido aparece na tela

    Scenario: "Confirmação de Cancelamento de Pedido não Enviada por Pedido já ter Saído Para Entrega"
        Given Eu estou na página de "Meus Pedidos" logado como "Emanoel Rafael"
        And Tenho o email "emanoelrafael2020@gmail.com" cadastrado
        And Tenho um pedido "Camisa DC" realizado e em andamento
        When Eu clico no botão "Cancelar Pedido"
        And Na janela "Confirmar Cancelamento de Pedido" eu clico no botão "Sim"
        Then Uma janela com uma mensagem informando que o pedido já saiu para a entrega no destino aparece na tela
