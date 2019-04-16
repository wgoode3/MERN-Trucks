const express = require('express'),
           bp = require('body-parser'),
         path = require('path'),
      DB_NAME = "truckin",
         port = 8000,
          app = express(),
         cors = require('cors');
          
app.use(bp.json());
const react_path = path.join(__dirname, './client/build');
app.use(express.static(react_path));
app.use(cors());

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/build/index.html'));
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});