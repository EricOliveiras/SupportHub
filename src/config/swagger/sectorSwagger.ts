/**
 * @swagger
 * /sectors:
 *   post:
 *     summary: Criar um novo setor
 *     description: Cria um novo setor no sistema.
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     requestBody:
 *       description: Dados do novo setor a serem criados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SEMAD-DTI"
 *     responses:
 *       201:
 *         description: Setor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       409:
 *         description: Conflito, setor já cadastrado
 */

/**
 * @swagger
 * /sectors:
 *   get:
 *     summary: Listar todos os setores
 *     description: Retorna uma lista de todos os setores cadastrados.
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     responses:
 *       200:
 *         description: Lista de setores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SectorResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 */

/**
 * @swagger
 * /sectors/{id}:
 *   get:
 *     summary: Obter detalhes de um setor pelo ID
 *     description: Retorna os detalhes de um setor específico pelo ID.
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do setor a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do setor retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Setor não encontrado
 */

/**
 * @swagger
 * /sectors/update/{id}:
 *   put:
 *     summary: Atualizar um setor
 *     description: Atualiza as informações de um setor específico pelo ID.
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do setor a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualização do setor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SEMAD-DAL"
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Setor não encontrado
 */

/**
 * @swagger
 * /sectors/delete/{id}:
 *   delete:
 *     summary: Deletar um setor
 *     description: Deleta um setor específico pelo ID.
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do setor a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Setor deletado com sucesso
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Setor não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SectorResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */
