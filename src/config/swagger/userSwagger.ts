/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário no sistema.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     requestBody:
 *       description: Dados do novo usuário a serem criados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "your_password"
 *               sectorId:
 *                 type: integer
 *                 example: 1
 *               roleId:
 *                 type: integer
 *                 example: 2
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       409:
 *         description: Conflito, email já cadastrado
 *
 *   get:
 *     summary: Listar todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithoutPasswordDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *
 * /users/{id}:
 *   get:
 *     summary: Obter detalhes de um usuário pelo ID
 *     description: Retorna os detalhes de um usuário específico pelo ID.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       404:
 *         description: Usuário não encontrado
 *
 * /users/profile/me:
 *   get:
 *     summary: Obter perfil do usuário logado
 *     description: Retorna os detalhes do perfil do usuário autenticado (logado).
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *
 * /users/update/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     description: Atualiza as informações de um usuário específico pelo ID.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []  # Exige autenticação JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados para atualização do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Doe"
 *               sectorId:
 *                 type: integer
 *                 example: 3
 *               roleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *       401:
 *         description: Não autorizado (falta ou erro no token JWT)
 *       403:
 *         description: Sem permissão para atualizar esse usuário
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "your_password"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-19T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-19T14:48:00.000Z"
 *         roleId:
 *           type: integer
 *           example: 2
 *         isActive:
 *           type: boolean
 *           example: true
 *         isAdmin:
 *           type: boolean
 *           example: true
 *         sectorId:
 *           type: integer
 *           nullable: true
 *           example: 1
 *     UserWithoutPasswordDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-19T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-19T14:48:00.000Z"
 *         roleId:
 *           type: integer
 *           example: 2
 *         isActive:
 *           type: boolean
 *           example: true
 *         isAdmin:
 *           type: boolean
 *           example: true
 *         sectorId:
 *           type: integer
 *           nullable: true
 *           example: 1
 */
