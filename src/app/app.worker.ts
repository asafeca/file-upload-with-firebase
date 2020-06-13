/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {

  const reader = new FileReader();
  reader.readAsArrayBuffer(data);

  const doWork =function(callback){
    reader.onload=(function(f){
      return function(e){

        callback(this.result);
        
      }
    })(data)
  }

  doWork(response=>{

    postMessage(response);

  })
  
  
});
