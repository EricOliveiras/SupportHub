import 'express-async-errors';
import {app} from "./config/server";
import {port} from "./config/vars";

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
