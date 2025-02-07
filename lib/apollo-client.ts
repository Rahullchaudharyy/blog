
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://cms.grey-to-green.com/graphql", 
    headers: {
      Authorization: `Bearer ${process.env.TOKEN || '52532a015f85d899866b18d8c883d75aaeff795483d85b45595db9b0691abe889a41034c9a0acd6d102ff2f4e58d461ed29f768cef2bdc1448c4a9923049429af7bb80b5516a389bc02308532cab7a451999bb2c2cc03096d054384fb3a3155d577b85890d002f9ce571a7bc78b8188be6a01d1dfdb67acff3d8eaf9ab6c16af'}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

