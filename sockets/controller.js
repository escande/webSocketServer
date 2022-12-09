
const socketController = (socket) => {
    console.log('sockete conectado - ', socket.id);

    socket.on('disconnect', () => console.log('sockete desconectado - ', socket.id));

    //El segundo argumento es opcional y
    //Es la devolución de la info al sockete
    socket.on('enviar-msg', (payload, callback) => { 

        const id = 123456;
        callback({id, fecha: new Date().getTime()});

        //Para todos los socketes, es un Broadcast
        //this.io.emit('enviar-msg', payload); //io se utiliza dentro del server

        //Los sockets tambien pueden enviar el emit
        //socket.emit('enviar-msg', payload);

        //Con el broadcast enviamos a todos
        socket.broadcast.emit('enviar-msg', payload);
    });

  };


module.exports = {
    socketController,
}