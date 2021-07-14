export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      Authorization: "JWT " + user.token,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
    };
  } else {
    return {};
  }
}
