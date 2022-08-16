Feature: "cancelamento de pedido"

    As a cliente com um pedido que ainda não saiu para entrega
    I want to cancelar o pedido que foi solicitado e mandar uma mensagem confirmando
    So That I seja informado que o pedido foi cancelado com sucesso

    Scenario: "cancelamento de pedido realizado com Sucesso"
        Given Eu estou na pagina de "meus pedidos" logado como "Emanoel Rafael"
		And tenho um pedido "camisa Marvel" realizado e em andamento
        When Eu clico no botão "cancelar pedido"
        And na janela "Confirmar cancelamento de pedido" eu seleciono "Sim"
		And o pedido ainda nao saiu para entrega
        Then Uma janela com uma mensagem de confirmação aparece na tela
        And Eu recebo uma mensagem com os dados do pedido cancelado no email cadastrado
        And Eu sou redirecionado para a tela de "Meus Pedidos"

    Scenario: "Desistência do cancelamento de Pedido"
        Given Eu estou na pagina de "meus pedidos" logado como "Emanoel Rafael"
		And tenho um pedido "camisa Marvel" realizado e em andamento
        When Eu clico no botão "cancelar pedido"
        And na janela "Confirmar cancelamento de pedido" eu seleciono "não"
        Then Eu sou redirecionado para a tela de "Meus Pedidos"
    
    Scenario: "Cancelamento do pedido quando ja saiu para entrega"
        Given Eu estou na pagina de "meus pedidos" logado como "Emanoel Rafael"
		And tenho um pedido "camisa Marvel" realizado e em andamento
        When Eu clico no botão "cancelar pedido"
        And na janela "Confirmar cancelamento de pedido" eu seleciono "Sim"
		And o pedido já saiu para entrega
        Then Eu sou redirecionado para a tela de "Meus Pedidos"
        And Eu recebo uma mensagem informando que o pedido já saiu para entrega e não pode ser cancelado