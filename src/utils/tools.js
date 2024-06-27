export function toolsGenerateRandomString(n = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < n; i++) {
    // 生成10个字符的随机字符串，可以根据需要调整
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
