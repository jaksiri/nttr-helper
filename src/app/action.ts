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
