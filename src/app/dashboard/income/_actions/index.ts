import { serverFetch } from "@/lib/utils/serverFetch";

const TAG = "incomes";

export async function getIncomes(queryString?: string) {
    try {
        const response = await serverFetch.get(`/incomes${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [TAG],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
