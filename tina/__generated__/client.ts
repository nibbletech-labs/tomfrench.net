import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'cc4cae5cd019463b34e16550320b9ea992497e9c', queries,  });
export default client;
  