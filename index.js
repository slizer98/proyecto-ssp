import express from 'express';
import open from 'open';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port 3000, http://localhost:${port}`);
    open('http://localhost:3000');
});