import PocketBase, {
  AuthModel,
  RecordAuthResponse,
  RecordModel,
} from "pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const POCKET_BASE_URL =
  process.env.POCKET_BASE_URL || "http://pocketbase.db/";

class DatabaseClient {
  private client: PocketBase;

  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL);
  }

  public get pocketBase(): PocketBase {
    return this.client;
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<RecordAuthResponse<RecordModel>> {
    try {
      const response = await this.client
        .collection("users")
        .authWithPassword(username, password);

      if (!response?.token) {
        throw new Error("Invalid email or password");
      } else {
        return response;
      }
    } catch (err) {
      console.error("Error authenticating: ", err);
      throw new Error("Invalid email or password");
    }
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<RecordModel> {
    try {
      const response = await this.client.collection("users").create({
        username,
        email,
        password,
        passwordConfirm: password,
      });
      console.log("New user created: ", response);
      return response;
    } catch (err) {
      console.error("Error registering: ", err);
      throw new Error("Error registering");
    }
  }

  async isAuthenticated(cookieStore: ReadonlyRequestCookies): Promise<boolean> {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.isValid || false;
  }

  async getUser(
    cookieStore: ReadonlyRequestCookies
  ): Promise<AuthModel | null> {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return null;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.model || null;
  }

  async createGame(
    cookieStore: ReadonlyRequestCookies,
    gameName: string,
    gameLength: string
  ): Promise<string | null> {
    console.log("Pockebase Create Game Function Called");
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return null;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    const user = this.client.authStore.model;
    if (!user) {
      throw new Error("User not found");
    }

    try {
      const response = await this.client.collection("games").create({
        ownerId: user.id,
        gameName,
        gameLength,
      });
      console.log("New game created: ", response);
      return response.id;
    } catch (err) {
      console.error("Error creating game: ", err);
      throw new Error("Error creating game");
    }
  }

  async getGamesList(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      throw new Error("Invalid Permissions");
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    const user = this.client.authStore.model;
    if (!user) {
      throw new Error("Invalid Permissions");
    }

    try {
      const response = await this.client
        .collection("games")
        .getFullList({ filter: `ownerId = "${user.id}"` });
      return response;
    } catch (err) {
      console.error("Error getting games list: ", err);
      throw new Error("Error getting games list");
    }
  }

  async getGame(cookieStore: ReadonlyRequestCookies, gameId: string) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      throw new Error("Invalid Permissions");
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    const user = this.client.authStore.model;
    if (!user) {
      throw new Error("Invalid Permissions");
    }

    try {
      const response = await this.client.collection("games").getOne(gameId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteGame(cookieStore: ReadonlyRequestCookies, gameId: string) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      throw new Error("Invalid Permissions");
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    const user = this.client.authStore.model;
    if (!user) {
      throw new Error("Invalid Permissions");
    }

    try {
      const response = await this.client.collection("games").delete(gameId);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

const db = new DatabaseClient();
export default db;
