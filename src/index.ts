import "express-async-errors";
import { port } from "./config/vars";
import { server } from "./config/socket";

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
