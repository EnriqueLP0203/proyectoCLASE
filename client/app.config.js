import "dotenv/config";

export default {
  expo: {
    name: "client",
    slug: "client",
    version: "1.0.0",
    extra: {
      apiUrl: process.env.API_URL,

      eas: {
        projectId: "6bdeba36-ae60-44d3-82cd-7b3e15b7181c",
      },
    },
  },
};
