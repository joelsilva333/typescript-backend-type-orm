import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Produtos",
      version: "1.0.0",
      description: "Documentação da API de produtos com TypeORM",
    },
    servers: [{ url: "http://localhost:8080" }],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            weight: { type: "integer" },
            createdAt: { type: "string", format: "date-time" }
          },
        },
        ProductInput: {
          type: "object",
          required: ["name", "description", "weight"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            weight: { type: "integer" },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"],
});
