let customerbann=true;
let viewer="I need to learn JavaScript";
let replay;
if(customerbann){
    replay='Sorry';
}
 else if(viewer){
    replay=`Enjoy ${viewer}`;
}
else{
    replay='Heloo Not having any viewer';
}
console.log(replay);