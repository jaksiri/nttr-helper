"use server";
import db from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const createGameSchema = z.object({
  gameName: z
    .string()
    .min(3, { message: "Game name must be at least 3 characters long" }),
  gameLength: z.string().min(1, { message: "Game length must not be empty" }),
});

export async function registerAction(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await db.register(
      validatedFields.data.username,
      validatedFields.data.email,
      validatedFields.data.password
    );
    if (response) {
      return {
        message: "Account created successfully, please login",
      };
    }
  } catch (err) {
    console.error(err);
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await db.authenticate(
      validatedFields.data.email,
      validatedFields.data.password
    );

    if (response) {
      const { record, token } = response;
      record.token = token;
      cookies().set("pb_auth", db.pocketBase.authStore.exportToCookie());
    }
  } catch (err) {
    return {
      error: "Invalid email or password",
    };
  }

  redirect("/dashboard");
}

type createGameFormData = {
  gameName: string;
  gameLength: string;
};

export async function createGameAction(formData: createGameFormData) {
  const validatedFields = createGameSchema.safeParse({
    gameName: formData.gameName,
    gameLength: formData.gameLength,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const gameId = await db.createGame(
      cookies(),
      validatedFields.data.gameName,
      validatedFields.data.gameLength
    );
    if (gameId) {
      return {
        message: "Game created successfully",
        gameId: gameId,
      };
    }
  } catch (err) {
    throw new Error("Error creating game");
  }
}
