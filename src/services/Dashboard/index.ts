import config from "@/configs";
import { getValidToken } from "../Auth/verifyToken";

const TAG = "dashboard";

export const getDashboardOverview = async () => {
    try {
        const accessToken = await getValidToken();

        const res = await fetch(`${config.base_api}/dashboard`, {
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
                message: result?.message || "Failed to fetch",
            };
        }

        return result.data;
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error.message || "Failed to fetch",
        };
    }
};
