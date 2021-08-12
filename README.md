# Consulta de informações sobre o cliente/nota

**RF - Requisitos Funcionais**

- O usuário deve poder consultar as informações da nota informando a empresa, o número da nota e a conta contrato

**RNF - Requisitos Não Funcionais**

- Utilizar o Knex para conectar ao banco Oracle

**RN - Regras de Negócio**

- Os campos conta contrato, empresa operadora e número da nota são obrigatórios

# Persistência de log da mensagem enviada

**RF - Requisitos Funcionais**

- O usuário deve poder inserir na tabela CLARA_MSG_SAIDA_ENVIADA o log de alguma mensagem que foi enviada pela Clara (whatsapp)

**RNF - Requisitos Não Funcionais**

- Utilizar o Knex para conectar ao banco Oracle

**RN - Regras de Negócio**

- Criar validação de campos obrigatórios

