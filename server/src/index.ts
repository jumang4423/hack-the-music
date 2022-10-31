import express from "express";
import { ServerConf } from "./serverConf";
import { ApolloMiddleware } from "./middleware/apollo.middleware";
import { AuthMiddleware } from "./middleware/auth.middleware";

const app = express();
app.use(AuthMiddleware);
ApolloMiddleware.applyMiddleware({ app, cors: true });

app.listen(ServerConf.PORT, () => {
  console.log(`Listening at http://localhost:${ServerConf.PORT}/graphql`);
});
