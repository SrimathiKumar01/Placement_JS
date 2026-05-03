let sri='scissors';
let jeeva='rock';
let result=sri===jeeva?'Tie':sri==='paper'&& jeeva==='rock'?'Sri Wins'
:sri==='paper'&&jeeva==='scissors'?'Jeeva Wins':sri==='scissors'&& jeeva==='rock'?'jeeva wins':sri==='scissors'&& jeeva==='paper'?'Sri wins':sri==='rock'&& jeeva==='scissors'?'Sri wins':sri==='rock'&& jeeva==='paper'?'Jeeva wins':'Invalid input';
console.log(result);