export const fetchUserInfo = async (token: string) => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/user/me/" + token, {
    method: "GET",
  });

  return await res.json();
};
