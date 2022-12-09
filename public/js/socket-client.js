//Referencias html
const lbOnline = document.querySelector('#lbOnline');
const lbOffline = document.querySelector('#lbOffline');
const txtmsg  = document.querySelector('#txtmsg');
const btEnviar = document.querySelector('#btEnviar');

console.log(lbOnline, lbOffline);


const socket = io();

socket.on('connect', () => {

    console.log('Cliente conectado');
    // lbOnline.hidden = false;
    // lbOffline.hidden = true;
    lbOnline.style.display = '';
    lbOffline.style.display = 'none';


});

socket.on('disconnect', () => {

    console.log('Cliente desconectado');
    // lbOnline.hidden = true;
    // lbOffline.hidden = false;
    lbOnline.style.display = 'none';
    lbOffline.style.display = '';
});

socket.on('enviar-msg', (payload) => {

    console.log(payload);

});

btEnviar.addEventListener('click', () => {

    const mesaje = txtmsg.value;

    const payload = {
        mesaje,
        id: '123456',
        fecha: new Date().getTime()
    }

    //El tercer argumento es opcional y es un callback que nos devuelve la info del server
    socket.emit('enviar-msg', payload, (id) => {

        console.log('Desde el servidor', id);
    });


});