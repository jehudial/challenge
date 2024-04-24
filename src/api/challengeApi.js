import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const challengeApi = axios.create({
  baseURL: "https://test.epdet.org/api/applicant",
});

//creates a new record
export const create = async (newRecord) => {
    // console.log(newRecord)
  const response = await challengeApi.post('',newRecord);
//   console.log(response)
  return response.data;
};

//queries base URL and adds query parameter if it was passed in
export const read = async (id) => {
  let url = "";
  if (id) {
    url = `?id=${id}`;
  }
  const response = await challengeApi.get(url);
  return response.data;
};

//updates a record with patch request
export const update = async (info) => {
  const { id, record } = info;
  const response = await challengeApi.patch(`?id=${id}`, record);
  return response.data;
};

//deletes a record
export const remove = async (id) => {
  const response = await challengeApi.delete(`?id=${id}`);
  return response.data;
};
