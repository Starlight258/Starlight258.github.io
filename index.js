
const title=document.querySelector("#title");
function getTime(){
  const now = new Date();
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  let timeDiff = xmasDay.getTime()-now.getTime();
  const leftDate = Math.floor(timeDiff/(3600*24*1000));
  timeDiff = timeDiff % (3600*24*1000);
  const leftHour = Math.floor(timeDiff/(3600*1000));
  timeDiff = timeDiff % (3600*1000)
  const leftMinutes = Math.floor(timeDiff/(60*1000));
  timeDiff = timeDiff % (60*1000);
  const leftSeconds = Math.floor(timeDiff/1000)
  title.innerText = `${leftDate}d \
  ${leftHour<10? `0${leftHour}`:leftHour}h \
  ${leftMinutes<10?`0${leftMinutes}`:leftMinutes}m \
  ${leftSeconds<10?`0${leftSeconds}`:leftSeconds}s`
}



function init(){
  getTime();
  setInterval(getTime, 1000);
};
init();