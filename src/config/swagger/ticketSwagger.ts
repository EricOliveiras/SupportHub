/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Criar um novo ticket
 *     description: Cria um novo ticket no sistema.
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     requestBody:
 *       description: Dados do novo ticket a serem criados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requester:
 *                 type: string
 *                 example: "Usuário Teste"
 *               problemDescription:
 *                 type: string
 *                 example: "Não consigo acessar o sistema."
 *               userId:
 *                 type: integer
 *                 example: 1
 *               sectorId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       409:
 *         description: Conflito, ticket já cadastrado
 *
 *   get:
 *     summary: Listar todos os tickets
 *     description: Retorna uma lista de todos os tickets cadastrados.
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     responses:
 *       200:
 *         description: Lista de tickets retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 */

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Obter detalhes de um ticket pelo ID
 *     description: Retorna os detalhes de um ticket específico pelo ID.
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ticket a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do ticket retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Ticket não encontrado
 */

/**
 * @swagger
 * /tickets/update/{id}:
 *   put:
 *     summary: Atualizar um ticket
 *     description: Atualiza as informações de um ticket específico pelo ID.
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ticket a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualização do ticket
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requester:
 *                 type: string
 *                 example: "Usuário Atualizado"
 *               problemDescription:
 *                 type: string
 *                 example: "Problema atualizado."
 *               finished:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Ticket atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Ticket não encontrado
 */

/**
 * @swagger
 * /tickets/delete/{id}:
 *   delete:
 *     summary: Deletar um ticket
 *     description: Deleta um ticket específico pelo ID.
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ticket a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deletado com sucesso
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Ticket não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         requester:
 *           type: string
 *         problemDescription:
 *           type: string
 *         finished:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
