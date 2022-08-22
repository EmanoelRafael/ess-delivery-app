Feature: Histórico de pedidos
	
	As a Cliente logado no aplicativo
	I want to Ver o histórico de pedidos
	So that Eu posso ver meus pedidos feitos

    Scenario: Visualizando o histórico de pedidos com pedidos
        Given Estou logado como o usuário "Erick"
		And Eu fiz a compra "Drone" no valor "R$500" no dia "24/07/2021"
        When Eu acesso a página "Histórico de pedidos"
        Then É exibido o pedido "Drone" no valor "R$500" comprado no dia "24/07/2021"
		
	Scenario: Visualizando o histórico de pedidos sem pedidos
        Given Estou logado como o usuário "Erick"
		And Eu não fiz nenhum pedido ainda
        When Eu acesso a página de histórico de pedidos
        Then Eu vejo uma mensagem avisando que não há pedidos a serem exibidos
    
    Scenario: Comprar novamente uma compra do histórico de pedidos
        Given Estou logado como o usuário "Erick"
		And Estou na página "Histórico de pedidos"
		And Eu fiz a compra "Drone" no valor "R$500" no dia "24/07/2021"
        When Eu seleciono a opção "Comprar novamente"
        Then O pedido é adicionado ao "Carrinho"
		And Uma mensagem de sucesso é exibida