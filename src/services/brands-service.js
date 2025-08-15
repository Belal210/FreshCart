import { apiClient } from "./api-client"

export async function getAllBrands() {
    try {
        const options = {
            method: "GET",
            url: `/brands`
        }
        const response = await apiClient.request(options)
        
        return response
    } catch (error) {
        throw error
    }
}