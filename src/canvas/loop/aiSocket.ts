export function createAISocket(url: string, onMessage: (action: any) => void) {
  const ws = new WebSocket(url);

  ws.onmessage = (event) => onMessage(JSON.parse(event.data));

  function sendState(state: any) {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(state));
  }

  return { ws, sendState };
}
