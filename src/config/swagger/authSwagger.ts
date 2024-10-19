/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       description: Dados de autenticação do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "your_password"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado para o usuário
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Dados de entrada inválidos
 */