import config from "@/configs";
import { getValidToken } from "../Auth/verifyToken";

const TAG = "today";

export const getTodayUpdate = async () => {
  try {
    const accessToken = await getValidToken();

    const res = await fetch(`${config.base_api}/today`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: [TAG],
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: [],
        message: result?.message || "Failed to fetch today update",
      };
    }

    return result.data;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch today update",
    };
  }
};
