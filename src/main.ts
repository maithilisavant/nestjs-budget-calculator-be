import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: ["http://localhost:3000"], // Add your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })

  // Set up global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Budget Calculator API")
    .setDescription("API for managing budget calculations")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
