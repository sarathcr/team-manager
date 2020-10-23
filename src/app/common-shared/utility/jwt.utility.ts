export const getUserFromJWT = () => {
  const token =
    localStorage.getItem('JWT_TOKEN') || sessionStorage.getItem('JWT_TOKEN')
  return token && JSON.parse(atob(token.split('.')[1]))
}
