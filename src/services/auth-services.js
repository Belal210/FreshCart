import { data } from "react-router";
import { apiClient } from "./api-client";

export async function sendDataToSignUp(values) {
    const options = {
        method: "POST",
        url: `/auth/signup`,
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          rePassword: values.rePassword,
        },
    };

    const response = await apiClient.request(options)
    
    return response;
}

export async function sendDataToLogIn(values) {
  const options = {
    method: "POST",
    url: `/auth/signin`,
    data: values,
  }

  const response = await apiClient.request(options)

  return response;
}

export async function verifyToken() {
  try {
    const options = {
    method: "GET",
    url: `/auth/verifyToken`,
  }

  const response = await apiClient.request(options)

  return response;

  } catch (error) {
    throw error
  }
}

export async function sendResetCode(values) {

  const options = {
    method: "POST",
    url: `/auth/forgotPasswords`,
    data: values,
  }

  const response = await apiClient.request(options)

  return response;

}

export async function verifyResetCode(sendingCode) {

  const options = {
    method: "POST",
    url: `/auth/verifyResetCode`,
    data: sendingCode,
  }

  const response = await apiClient.request(options)

  return response;

}

export async function resetPassword(values) {

  const options = {
    method: "PUT",
    url: `/auth/resetPassword`,
    data: values,
  }

  const response = await apiClient.request(options)

  return response;

}

export async function updateUserdata(values) {
  try {
    const options = {
      method: "PUT",
      url: `/users/updateMe/`,
      data: values,
    }

    const response = await apiClient.request(options)
    return response;

  } catch (error) {
    throw error
  }
}

export async function changeUserPassword(values) {
  try {
    const options = {
      method: "PUT",
      url: `/users/changeMyPassword`,
      data: values,
    }

    const response = await apiClient.request(options)
    return response;
    
  } catch (error) {
    throw error
  }
}