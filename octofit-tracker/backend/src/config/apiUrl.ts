const PORT = 8000;

export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

export { PORT };