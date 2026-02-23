import http from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { v4 as uuid } from "uuid"

dotenv.config()

const server = http.createServer()
const port = process.env.PORT || 5000

const io = new Server(server, {
    cors: { origin: "*" }
})

const waitingQueue = []
const activePairs = new Map()

io.on("connection", (socket) => {
    console.log("Connected:", socket.id)

    socket.on("start", () => {
        // Prevent duplicate queue entry
        if (waitingQueue.includes(socket.id) || activePairs.has(socket.id)) {
            return
        }

        // Try to match with someone waiting
        if (waitingQueue.length > 0) {
            const partnerId = waitingQueue.shift()

            // Safety check
            if (!partnerId || partnerId === socket.id) {
                waitingQueue.push(socket.id)
                socket.emit("waiting")
                return
            }

            const roomId = uuid()

            // Save pair
            activePairs.set(socket.id, { partnerId, roomId })
            activePairs.set(partnerId, { partnerId: socket.id, roomId })

            // Join both to room
            socket.join(roomId)
            const partnerSocket = io.sockets.sockets.get(partnerId)
            partnerSocket?.join(roomId)

            // Notify both
            socket.emit("matched", { roomId })
            io.to(partnerId).emit("matched", { roomId })

        } else {
            waitingQueue.push(socket.id)
            socket.emit("waiting")
        }
    })

    socket.on("next", () => {
        leaveCurrentChat(socket.id)
        socket.emit("waiting")
        waitingQueue.push(socket.id)
    })

    socket.on("disconnect", () => {
        leaveCurrentChat(socket.id)
        console.log("Disconnected:", socket.id)
    })

    function leaveCurrentChat(id) {
        // Remove from waiting queue
        const index = waitingQueue.indexOf(id)
        if (index !== -1) {
            waitingQueue.splice(index, 1)
        }

        const pairData = activePairs.get(id)
        if (!pairData) return

        const { partnerId, roomId } = pairData

        // Notify partner
        io.to(partnerId).emit("partner_left")

        // Leave rooms
        socket.leave(roomId)
        const partnerSocket = io.sockets.sockets.get(partnerId)
        partnerSocket?.leave(roomId)

        // Clean up map
        activePairs.delete(id)
        activePairs.delete(partnerId)
    }
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})