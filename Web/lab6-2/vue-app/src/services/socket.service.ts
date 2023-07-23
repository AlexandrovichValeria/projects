import { io, Socket } from 'socket.io-client';

class SocketService {
    socket!: Socket;
    setupSocketConnection() {
        const URL = "http://localhost:4200";
        this.socket = io(URL);

        return this.socket;
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketService();