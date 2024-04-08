const app = require('./app'); 
const port = process.env.PORT || 8002;

app.listen(port, () => console.log(`Server started on port ${port}`));
