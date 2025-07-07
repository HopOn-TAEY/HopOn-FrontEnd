# :checkered_flag: HopOn




Este projeto visa desenvolver uma plataforma web inovadora para facilitar o compartilhamento de veículos no município de Itapajé e em suas regiões próximas. O objetivo principal é promover a economia local, oferecendo uma solução de transporte eficiente e acessível para a comunidade. A plataforma conectará usuários que precisam de transporte (passageiros) com aqueles que desejam oferecer seus veículos (motoristas), criando um ecossistema de mobilidade colaborativa.




## :technologist: Membros da Equipe e Orientador

**Orientador do Projeto:** Prof. Dr. Anderson Uchôa

**Membros da Equipe:**

- **José Talyson de Freitas Sousa** (Matrícula: 566530) - Análise e Desenvolvimento de Sistemas
- **Raimunda Ygrind Coelho Silva** (Matrícula: 566846) - Análise e Desenvolvimento de Sistemas
- **Aurelice de Freitas Luciano** (Matrícula: 570450) - Análise e Desenvolvimento de Sistemas
- **José Eric Sousa Pires** (Matrícula: 564922) - Análise e Desenvolvimento de Sistemas




## :people_holding_hands: Papéis ou Tipos de Usuário da Aplicação

O sistema de compartilhamento de veículos é projetado para atender a dois perfis distintos de usuários, cada um com funcionalidades e interações específicas que garantem a fluidez e a eficiência do serviço. Esses papéis são fundamentais para a dinâmica da plataforma, conectando a oferta de transporte com a demanda por ele. Os dois tipos de usuários são: **Motorista** e **Passageiro**.

### Passageiro

O Passageiro é o usuário que busca por um veículo para realizar deslocamentos dentro do município de Itapajé ou para regiões próximas. A experiência do Passageiro na plataforma é centrada na facilidade de encontrar e solicitar transportes que atendam às suas necessidades específicas.

### Motorista

O Motorista é o usuário que possui um veículo e deseja oferecê-lo para o transporte de passageiros, contribuindo para a economia local e otimizando o uso de seu automóvel. O papel do Motorista é fundamental para a oferta de serviços na plataforma.




## :spiral_calendar: Entidades ou Tabelas do Sistema

### Tabela: Motorista

Esta entidade representa os usuários que oferecem seus veículos para transporte. É uma das entidades centrais do sistema, pois gerencia as informações dos provedores de serviço.

**Atributos:**
- `id_motorista` (Chave Primária - PK): Identificador único para cada motorista.
- `Nome`: Nome completo do motorista.
- `Email` (Único): Endereço de e-mail do motorista, utilizado para login e comunicação. Deve ser único para cada registro.
- `Senha`: Senha de acesso do motorista à plataforma. Idealmente, deve ser armazenada de forma criptografada.
- `Telefone`: Número de telefone para contato com o motorista.
- `Data_nasc`: Data de nascimento do motorista.
- `Data_create`: Data de criação do registro do motorista na plataforma.
- `Corrida_privada`: Indica se o motorista oferece corridas privadas (True/False).
- `CNH` (Único): Número da Carteira Nacional de Habilitação do motorista. Deve ser único para cada motorista e é crucial para a verificação de elegibilidade.
- `Image`: Referência a uma imagem do motorista ou do perfil, possivelmente um caminho para o arquivo da imagem.

### Tabela: Passageiro

Esta entidade representa os usuários que buscam por transporte. É a contraparte da entidade Motorista, essencial para a demanda de serviços.

**Atributos:**
- `id_passageiro` (Chave Primária - PK): Identificador único para cada passageiro.
- `Nome`: Nome completo do passageiro.
- `Email` (Único): Endereço de e-mail do passageiro, utilizado para login e comunicação. Deve ser único.
- `Senha`: Senha de acesso do passageiro à plataforma.
- `Telefone` (Único): Número de telefone para contato com o passageiro. Deve ser único.
- `Data_nasc`: Data de nascimento do passageiro.
- `Data_create`: Data de criação do registro do passageiro na plataforma.

### Tabela: Veiculo

Esta entidade armazena as informações detalhadas dos veículos que são oferecidos pelos motoristas.

**Atributos:**

- `veiculo_placa` (Chave Primária - PK, Único): Placa do veículo, utilizada como identificador único. É um atributo crítico para a identificação do automóvel.
- `suport_criança`: Indica se o veículo possui suporte para crianças (cadeirinha, assento de elevação) (True/False).
- `suport_PCD`: Indica se o veículo possui suporte para Pessoas com Deficiência (PCD), como adaptações para cadeirantes (True/False).
- `veiculo_model`: Modelo do veículo (ex: HB20, Siena).
- `veiculo_marca`: Marca do veículo (ex: HYUNDAI, FIAT).

### Tabela: Corrida

Esta entidade representa uma oferta de transporte específica, criada por um motorista.

**Atributos:**
- `id_corrida` (Chave Primária - PK): Identificador único para cada corrida.
- `N_vagas`: Número de vagas disponíveis no veículo para aquela corrida.
- `Data_saida`: Data e hora de saída da corrida.
- `Origem`: Local de partida da corrida.
- `Destino`: Local de destino da corrida.
- `Preço`: Preço da corrida.

### Tabela: Avaliacao

Esta entidade armazena as avaliações feitas pelos usuários (motoristas ou passageiros) sobre as corridas ou sobre outros usuários.

**Atributos:**

- `Nota`: Nota atribuída na avaliação (ex: 5).
- `comentario`: Comentário descritivo sobre a avaliação (ex: muito educado e gentil).

### Tabela: Perfil_usuario

Esta entidade parece ser uma tabela de junção ou um perfil mais detalhado que agrega informações de motoristas e passageiros, possivelmente para uma visão unificada ou para armazenar dados específicos do perfil que não se encaixam nas tabelas principais de Motorista ou Passageiro.

**Atributos:**

- `nome`: Nome do usuário (motorista ou passageiro).
- `telefone`: Telefone do usuário.
- `nota`: Nota de avaliação do usuário.
- `verificacao_cnh`: Indica se a CNH do usuário foi verificada (True/False). Isso sugere que esta tabela pode ser mais focada em motoristas ou em um status de verificação geral.
- `image`: Imagem de perfil do usuário.
- `tipo`: Indica o tipo de usuário (motorista ou passageiro).

### Tabela: Viagens_solicitadas

Esta entidade representa as solicitações de viagem feitas pelos passageiros.

**Atributos:**

- `status`: Status da solicitação (ex: concluída, pendente).
- `veiculo`: Modelo do veículo associado à solicitação.
- `id_corrida`: Chave estrangeira (FK) referenciando a `id_corrida` da tabela Corrida, indicando a corrida que foi solicitada.

### Tabela: Frota_Dirige

Esta é uma tabela de relacionamento que conecta Motorista e Corrida, indicando quais corridas são dirigidas por quais motoristas.

**Atributos:**
- `id_motorista` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_motorista` da tabela Motorista.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.

### Tabela: Corrida_veiculo

Esta é uma tabela de relacionamento que conecta Corrida e Veiculo, indicando qual veículo é usado em qual corrida.

**Atributos:**

- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.
- `id_veiculo` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `veiculo_placa` da tabela Veiculo.

### Tabela: Vaga_passageiro

Esta é uma tabela de relacionamento que conecta Passageiro e Corrida, indicando quais passageiros ocupam vagas em quais corridas.

**Atributos:**

- `id_passageiro` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_passageiro` da tabela Passageiro.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.

### Tabela: Corrida_avaliacao

Esta é uma tabela de relacionamento que conecta Passageiro e Corrida com a Avaliacao, indicando a avaliação de uma corrida por um passageiro.

**Atributos:**

- `id_passageiro` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_passageiro` da tabela Passageiro.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.

### Tabela: Mostra_possui

Esta é uma tabela de relacionamento que conecta Motorista e Veiculo, indicando quais veículos são de propriedade ou são utilizados por quais motoristas.

**Atributos:**

- `id_motorista` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_motorista` da tabela Motorista.
- `placa_veiculo` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `veiculo_placa` da tabela Veiculo.

### Tabela: Motorista_viagenssolicitadas

Esta tabela parece ser uma tabela de agregação ou relacionamento que mostra a quantidade de solicitações de viagem que um motorista recebeu para uma corrida específica.

**Atributos:**

- `id_motorista` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_motorista` da tabela Motorista.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.
- `solicitacoes`: Número de solicitações recebidas para aquela corrida.

### Tabela: Visualiza_passageiro

Esta é uma tabela de relacionamento que conecta Passageiro e Corrida, indicando quais corridas foram visualizadas por quais passageiros.

**Atributos:**

- `id_passageiro` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_passageiro` da tabela Passageiro.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.

### Tabela: Mostra_pertence

Esta é uma tabela de relacionamento que conecta Passageiro e Corrida, indicando a ordem de visualização ou alguma outra métrica de pertencimento.

**Atributos:**

- `id_passageiro` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_passageiro` da tabela Passageiro.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.
- `ordem`: Ordem de visualização ou alguma outra métrica.

### Tabela: Corrida_viagenssolicitadas

Esta tabela parece ser uma tabela de relacionamento ou agregação que conecta Corrida com alguma métrica de ordem, possivelmente relacionada a solicitações de viagem.

**Atributos:**

- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.
- `ordem`: Ordem ou sequência.

### Tabela: Motorista_pertence

Esta é uma tabela de relacionamento que conecta Motorista e Corrida, indicando a ordem de alguma métrica de pertencimento ou associação.

**Atributos:**

- `id_motorista` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_motorista` da tabela Motorista.
- `id_corrida` (Chave Primária - PK, Chave Estrangeira - FK): Referencia a `id_corrida` da tabela Corrida.
- `ordem`: Ordem ou sequência.




## :triangular_flag_on_post: Principais Funcionalidades da Aplicação

### Funcionalidades Acessíveis a Todos os Usuários (Não Logados e Logados)

Estas funcionalidades estão disponíveis para qualquer pessoa que acesse o website da aplicação, independentemente de possuir uma conta ou de estar logado. Elas são projetadas para fornecer uma visão geral do serviço e incentivar o registro.

- **Visualização da Página Inicial:** Apresentação da proposta de valor da plataforma, seus benefícios e como funciona o compartilhamento de veículos.
- **Informações sobre o Serviço:** Descrições detalhadas sobre como se tornar um Passageiro ou um Motorista, as áreas de atuação (inicialmente Itapajé e regiões próximas), e os termos de uso.
- **Cadastro de Usuário:** Opção para criar uma nova conta na plataforma, seja como Passageiro ou Motorista. Este é o ponto de entrada para acessar as funcionalidades restritas.
- **Login de Usuário:** Acesso à conta existente para usuários já registrados.
- **Visualização de Estatísticas de Transporte (Públicas):** Uma aba dedicada que exibe dados agregados sobre os transportes mais utilizados no município de Itapajé. Esta funcionalidade visa demonstrar a demanda e incentivar a oferta de veículos, sendo acessível a todos para promover a transparência e o engajamento.

### Funcionalidades Restritas a Usuários Logados

Para acessar as funcionalidades abaixo, o usuário deve ter uma conta e estar logado na plataforma. Algumas dessas funcionalidades são específicas para o tipo de usuário (Passageiro ou Motorista).

#### Funcionalidades para Passageiros (Usuários Logados)

- **Busca e Solicitação de Transportes:**
  - **Pesquisa de Viagens:** Capacidade de buscar transportes disponíveis com base em critérios como origem, destino, data e hora.
- **Visualização Detalhada de Veículos e Corridas:** Acesso a informações completas sobre as ofertas de transporte, incluindo detalhes do veículo (modelo, marca, suporte para crianças/PCD, imagens, vídeos), horários, vagas disponíveis e preço.
- **Solicitação de Viagem:** Envio de solicitações de viagem aos motoristas.
- **Gestão de Solicitações:** Acompanhamento do status das solicitações de viagem (pendente, aceita, recusada, concluída).
- **Avaliação de Motoristas e Veículos:** Após a conclusão de uma viagem, o Passageiro pode avaliar o Motorista e o veículo, contribuindo para a reputação e a qualidade do serviço.
- **Visualização do Histórico de Viagens:** Acesso a um registro das viagens realizadas e solicitadas.
- **Gerenciamento de Perfil:** Edição de informações pessoais, preferências e configurações da conta.

#### Funcionalidades para Motoristas (Usuários Logados)

- **Cadastro e Gestão de Veículos:**
  - **Registro de Automóveis:** Adição de novos veículos à frota, com preenchimento de informações detalhadas como placa, modelo, marca, capacidade, recursos adicionais (suporte para crianças, PCD), etiquetas de identificação, e upload de imagens/vídeos.
  - **Definição de Rotas e Horários:** Especificação do local de partida, destino, horário de saída ou período de funcionamento para as ofertas de transporte.
  - **Gestão de Vagas:** Definição do número de vagas disponíveis para cada corrida.
  - **Disponibilidade de Contato:** Opção de disponibilizar informações de contato para comunicação direta com os passageiros.

- **Gestão de Ofertas de Transporte:**
  - **Criação de Novas Corridas:** Publicação de novas ofertas de transporte com todos os detalhes necessários.
  - **Visualização e Gerenciamento de Solicitações:** Acompanhamento das solicitações de viagem recebidas, com opções para aceitar ou recusar.
  - **Atualização de Status de Corridas:** Gerenciamento do status das corridas (ativa, concluída, cancelada).
  - **Avaliação de Passageiros:** Possibilidade de avaliar os Passageiros após as viagens, contribuindo para a segurança e a qualidade da comunidade.
  - **Visualização do Histórico de Corridas:** Acesso a um registro das corridas oferecidas e realizadas.
  - **Gerenciamento de Perfil:** Edição de informações pessoais, dados do veículo e configurações da conta.




## :desktop_computer: Tecnologias e Frameworks Utilizados

### Frontend:

- **TypeScript**
- **HTML**
- **CSS**
- **React**
- **HookForm (React Hook Form)**
- **Inputmask**

### Backend:

- **Node.js**
- **Fastify**
- **Zod**




## :shipit: Operações Implementadas para Cada Entidade da Aplicação

| Entidade | Criação | Leitura | Atualização | Remoção |
|---|---|---|---|---|
| Usuario | X | X | | X |
| Veiculo | X | X | X | |
| Corrida | X | X | X | X |
| Corrida_privada | X | X | X | |
| Reserva | X | | | |
| Avaliação | | | | |
| Notificação | | | | |





## :neckbeard: Rotas da API REST Utilizadas

| Método HTTP | URL |
|---|---|
| `GET` | `/api/entidade1/` |
| `POST` | `/api/entidade2` |




## Documentação

- [Documento de visão do projeto](https://github.com/anderson-uchoa/github-template-projeto-integrador/blob/main/docs/documento_visao.docx)
- [Regras gerais da disciplina](https://github.com/anderson-uchoa/github-template-projeto-integrador/blob/main/docs/regras_gerais.pdf)
- [Apresentação do Projeto] - Vídeo a ser criado



