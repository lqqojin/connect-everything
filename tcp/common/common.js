const writeData = (socket, data) => {
    var success = !socket.write(data);
    if (!success){
        (function(socket, data){
            socket.once('drain', function(){
                writeData(socket, data);
            });
        })(socket, data);
    }
}

module.exports = {
    writeData
}
