```
npm install
npm run dev
```

```
open http://localhost:3000
```

# Introduction to ORMs and Prisma Lab Guide

## What is an ORM?

ORM stands for Object-Relational Mapping. It's a programming technique that allows developers to interact with databases using object-oriented programming languages, rather than writing SQL queries directly.

### Key Points:
- ORMs convert data between incompatible type systems (e.g., databases and object-oriented programming languages).
- They provide an abstraction layer between the application code and the database.
- ORMs allow developers to work with database records as if they were regular objects in their programming language.

## Why are ORMs Great?

1. **Productivity**: Write less code to interact with databases.
2. **Maintainability**: Changes to the database schema can often be managed through the ORM, reducing the need to update SQL queries throughout the codebase.
3. **Database Agnostic**: Many ORMs support multiple database systems, allowing easier migration between different databases.
4. **Security**: ORMs often include built-in protection against SQL injection attacks.
5. **Performance Optimization**: Many ORMs include query optimization techniques out of the box.

## Simple Example (Using Prisma with a Book entity)

Let's consider a simple example of managing a library's book collection:

```prisma
// Define the model in prisma.schema
model Book {
  id        Int      @id @default(autoincrement())
  title     String
  author    String
  isbn      String   @unique
  publishedAt DateTime
}
```

```typescript

// Using the model in your code
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create a new book
const newBook = await prisma.book.create({
  data: {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    publishedAt: new Date('1925-04-10')
  }
})

// Query for books
const books = await prisma.book.findMany({
  where: {
    author: 'F. Scott Fitzgerald'
  }
})
```

## Lab Guide: Implementing Prisma in the Provided API

1. **Setup Prisma**:
   - Install Prisma: `npm install prisma --save-dev`
   - Initialize Prisma: `npx prisma init`

2. **Define the User Model**:
   - Open `prisma/schema.prisma`
   - Define the User model based on your current in-memory structure

3. **Generate Prisma Client**:
   - Run `npx prisma generate`

4. **Update Repository**:
   - Create a new file `PrismaUserRepository.ts`
   - Implement the `UserRepository` interface using Prisma Client

5. **Modify Use Cases**:
   - Update `RegisterNewUser.ts` and `LoginUser.ts` to use the new Prisma repository

6. **Update API Routes**:
   - Modify `HonoRouter.ts` to use the Prisma-based use cases

7. **Testing**:
   - Update or create new tests to ensure the Prisma implementation works correctly

Remember to handle database connections properly, typically by creating a single PrismaClient instance and reusing it across requests.

## Conclusion

By completing this lab, you'll gain hands-on experience with ORMs, specifically Prisma. You'll see how it simplifies database operations and improves code maintainability. Good luck, and enjoy exploring the world of ORMs!

When you're done, implement the same concepts with the entity Message (for a chat application).
Good luck ! 🚀