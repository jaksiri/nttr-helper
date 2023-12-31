import PocketBase, {
  AuthModel,
  RecordAuthResponse,
  RecordModel,
} from "pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const POCKET_BASE_URL =
  process.env.POCKET_BASE_URL || "http://127.0.0.1:8090";

export class DatabaseClient {
  private static _instance: DatabaseClient;
  private _pocketBase: PocketBase;

  private constructor() {
    this._pocketBase = new PocketBase(POCKET_BASE_URL);
  }

  public static get instance(): DatabaseClient {
    if (!DatabaseClient._instance) {
      DatabaseClient._instance = new DatabaseClient();
    }

    return DatabaseClient._instance;
  }

  public get pocketBase(): PocketBase {
    return this._pocketBase;
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<RecordAuthResponse<RecordModel>> {
    try {
      const response = await this._pocketBase
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
      const response = await this._pocketBase.collection("users").create({
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

    this._pocketBase.authStore.loadFromCookie(cookie?.value || "");
    return this._pocketBase.authStore.isValid || false;
  }

  async getUser(
    cookieStore: ReadonlyRequestCookies
  ): Promise<AuthModel | null> {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return null;
    }

    this._pocketBase.authStore.loadFromCookie(cookie?.value || "");
    return this._pocketBase.authStore.model || null;
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

    this._pocketBase.authStore.loadFromCookie(cookie?.value || "");
    const user = this._pocketBase.authStore.model;
    if (!user) {
      throw new Error("User not found");
    }

    try {
      const response = await this._pocketBase.collection("games").create({
        ownerId: user.id,
        gameName,
        gameLength,
      });
      console.log("New game created: ", response);
      return response.collectionId;
    } catch (err) {
      console.error("Error creating game: ", err);
      throw new Error("Error creating game");
    }
  }

  async getGamesList(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return null;
    }

    this._pocketBase.authStore.loadFromCookie(cookie?.value || "");
    const user = this._pocketBase.authStore.model;
    if (!user) {
      throw new Error("Invalid Permissions");
    }

    try {
      const response = await this._pocketBase
        .collection("games")
        .getFullList({ filter: `ownerId = "${user.id}"` });
      return response;
    } catch (err) {
      console.error("Error getting games list: ", err);
      throw new Error("Error getting games list");
    }
  }
}

const db = DatabaseClient.instance;
export default db;
