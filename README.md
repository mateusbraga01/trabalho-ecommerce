Front-End
npm install react react-dom react-router-dom axios

BackEnd
npm install express cors body-parser mongoose dotenv


1. Como Adicionar um Produto (Admin)
Acesse o painel de administração com um usuário com permissão de administrador.
Na página de administração, clique no botão Adicionar Produto.
Preencha os seguintes campos:
Nome: Nome do produto.
Descrição: Descrição detalhada do produto.
Preço: Preço do produto.
Estoque: Quantidade disponível do produto.
Categoria: Selecione uma categoria ou crie uma nova categoria para o produto.
Clique em Salvar para adicionar o produto à lista.
2. Como Editar um Produto (Admin)
No painel de administração, localize o produto que você deseja editar.
Clique no botão Editar ao lado do produto.
Faça as modificações desejadas nos campos do produto.
Clique em Salvar para atualizar as informações do produto.
3 Como Deletar um Produto (Admin)
No painel de administração, localize o produto que você deseja excluir.
Clique no botão Deletar ao lado do produto.
Confirme a exclusão do produto. O produto será removido permanentemente da base de dados.
4 Como Filtrar Produtos (Usuário)
Os usuários podem filtrar os produtos de acordo com a categoria e o preço:

Filtrar por Categoria: No menu de filtros, escolha a categoria desejada.
Filtrar por Faixa de Preço: Escolha um intervalo de preço (por exemplo, "Até R$100", "De R$100 a R$500", etc.) no filtro de preço.
Os produtos serão filtrados automaticamente com base nas suas escolhas.

5 Como Adicionar um Produto ao Carrinho (Usuário)
Na página de listagem de produtos, encontre o produto que deseja comprar.
Clique no botão Adicionar ao Carrinho.
Se o produto tiver estoque suficiente, ele será adicionado ao carrinho. Caso contrário, uma mensagem de "Sem estoque" será exibida.
6 Como Visualizar o Carrinho e Finalizar a Compra (Usuário)
Para visualizar o carrinho, clique no ícone de carrinho no canto superior direito da página.
Na página de checkout, você verá os itens que adicionou ao carrinho, incluindo o nome, preço, quantidade e total.
Você pode remover itens do carrinho clicando no botão Remover ao lado do produto.
Após revisar o carrinho, clique em Finalizar Compra para concluir a compra. O carrinho será esvaziado e um alerta de confirmação será exibido.
