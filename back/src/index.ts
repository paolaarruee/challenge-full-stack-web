import { server } from "./server/Server";
import { sequelize } from '../src/server/database/database';

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('DB sync done');
    
    server.listen(3333, () => {
      console.log("App rodando em http://localhost:3333");
    });

  })
  .catch((err) => {
    console.error('DB sync failed:', err);
  });