import API from "./api";

export const startInterview = async () => {
  const { data } = await API.post("/interview/start", {
    role: "Frontend Developer",
  });
  return data;
};

export const sendAnswer = async (id, message) => {
  const { data } = await API.post("/interview/chat", {
    interviewId: id,
    message,
  });
  return data;
};

export const getHistory = async () => {
  const { data } = await API.get("/interview/history");
  return data;
};