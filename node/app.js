const express = require('express');
const mysql = require('mysql2');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Criar a tabela se não existir
db.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`, (err, results) => {
  if (err) {
    console.error('Erro ao criar tabela: ', err);
  }
});

// Inserir um registro na tabela
const sql = `INSERT INTO people(name) values('Fulano'), ('ciclano'), ('Beltrano')`;
db.query(sql)

// Inicializar o servidor Express
const app = express();
const port = 3000;

// Middleware para parse de JSON
app.use(express.json());

// Página inicial
app.get('/', (req, res) => {
  db.query('SELECT id, name FROM people', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados: ' + err);
    }

    // Criando um HTML simples para listar os dados
    let html = '<h1>Full Cycle</h1><br>Listagem de pessoas cadastradas:<ul>';
    results.forEach(person => {
      html += `<li>ID: ${person.id}, Nome: ${person.name}</li>`;
    });
    html += '</ul>';
    
    res.send(html);
  });
});

// Rota para salvar dados no banco
app.post('/add', (req, res) => {
  const { nome } = req.body;
  const query = 'INSERT INTO people (name) VALUES (?)';
  db.execute(query, [nome], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao salvar dados: ' + err);
    }
    res.status(200).send('Dados salvos com sucesso!');
  });
});

// Rota para listar os dados do banco
app.get('/list', (req, res) => {
  db.query('SELECT * FROM people', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados: ' + err);
    }
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
