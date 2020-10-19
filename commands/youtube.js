module.exports = {
    name: 'youtube',
    description: "sends the youtube link",
    execute(message, args){

        if(message.member.roles.cache.has('767107038492098591')){
            message.member.roles.remove('767107038492098591').catch(console.error); 
            message.channel.send('https://www.youtube.com');
            


        } else {
            message.channel.send('its dangerous to go alone take this');
         
        }
    
    }
}   