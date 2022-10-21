As a: Cliente
I want to: adicionar e remover itens do meu carrinho
So i: realizar pedidos

Given estou logado como "cliente"

Scenario: Adição de item ao carrinho 
    Given estou na página "Catálogo"
    And vejo o item "Echo Dot" no catálogo
    When adiciono o item "Echo Dot" ao carrinho
    Then continuo na página "Catálogo"
    And vejo a mensagem "Echo Dot adicionado ao carrinho"

Scenario: Finalização de pedido
    Given estou na página "Carrinho"
    And os itens "Echo Dot" e "Controle Dualsense" estão adicionados ao carrinho
    When finalizo o pedido
    Then eu sou redirecionado para a página "Pagamento"

Scenario: Finalização de pedido com item fora de estoque
    Given estou na página "Carrinho"
    And vejo os itens "Echo Dot" e "Controle Dualsense" adicionados ao carrinho
    And o item "Echo Dot" está fora de estoque
    When finalizo o pedido
    Then continuo na página "Carrinho"
    And vejo a mensagem "O item Echo Dot está sem estoque"

Scenario: Remoção de item do carrinho
    Given estou na página "Carrinho"
    And os itens "Echo Dot" e "Controle Dualsense" estão adicionados ao carrinho
    When removo o item "Echo Dot" do carrinho
    Then continuo na página "Carrinho"
    And vejo somente o item "Controle Dualsense" adicionado ao carrinho

Scenario: Confirmação de pagamento
    Given eu estou na página "Pagamento"
    And os itens "Echo Dot" e "Controle Dualsense" estão adicionados ao carrinho
    And a opção "Forma de pagamento" está configurada como "Boleto"
    When confirmo o pagamento método
    Then sou redirecionado para a página "Pedido confirmado"
    And vejo a mensagem "Pedido concluído"
    And o carrinho está vazio

Scenario: Adição de item já adicionado ao carrinho
    Given eu estou na página "Catálogo"
    And vejo o item "Echo Dot" no catálogo
    And o item "Echo Dot" está adicionado ao carrinho
    When adiciono o item "Echo Dot" ao carrinho
    Then vejo a mensagem "Echo Dot já foi adicionado ao carrinho"
    And o item "Echo Dot" continua adicionado ao carrinho
