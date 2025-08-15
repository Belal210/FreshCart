import { apiClient } from "./api-client"

export async function addProductToCart({id}) {
    try {
        const options = {
        method: "POST",
        url: "/cart",
        data: {
            productId: id,
        }
    }

    const response = await apiClient.request(options)
    return response;

    } catch (error) {
        throw error;
    }
}

export async function getCartItems() {
    try {
        const options = {
        method: "GET",
        url: "/cart",
    }

    const response = await apiClient.request(options)
    return response;

    } catch (error) {
        throw error
    }

}

export async function removeItemFromCart ({id}) {
    try {
        const options = {
            method: "DELETE",
            url: `/cart/${id}`,
        }

        const response = await apiClient.request(options)
        return response;
    } catch (error) {
        throw error
    }
}

export async function clearCart () {
    try {
        const options = {
            method: "DELETE",
            url: `/cart`,
        }

        const response = await apiClient.request(options)
        return response;
    } catch (error) {
        throw error
    }
}

export async function updateProductQuantity ({id , count}) {
    try {
        const options = {
            method: "PUT",
            url: `/cart/${id}`,
            data: {
                count
            }
        }

        const response = await apiClient.request(options)
        return response;
    } catch (error) {
        throw error
    }
}