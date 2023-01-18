let form= document.querySelector("form"),
 formInput= document.querySelector(".fileInput"),
 progressArea= document.querySelector(".progress-area"),
 uploadedArea= document.querySelector(".uploaded-area");
form.onclick= function(){
    formInput.click()
    
}

    formInput.onchange = (e)=>{
        console.log(e)
    }
formInput.onchange= ({target})=>{
    let file= target.files[0]
    if(file){
        let fileName= file.name
        if(fileName.length>=12){
            fileName= fileName.split('.')[0].substring(0,12)+"."+ fileName.split('.')[1]
        }
        uploadFile(fileName)
    }
function uploadFile(n){
    let xhr= new XMLHttpRequest()
    xhr.open("POST","upload.php")
    xhr.upload.addEventListener("progress",({loaded,total})=>{
        let fileLoaded= Math.floor((loaded/total)*100)
        let fileTotal= Math.floor(total)
        let fileSize;
        (fileSize<1024) ? fileSize= fileTotal+"KB" : fileSize=(fileTotal/(1024*1024)).toFixed(2)+ "MB"
        let progressHTML= `
                            <li class="row">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                                <div class="details">
                                    <span class="name">${n} Uploading</span>
                                    <span class="percent">${fileLoaded} %</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress" style="width:${fileLoaded}% "></div>
                                </div>
                            </div>
                        </li>
                          `
        progressArea.innerHTML= progressHTML

        let uploadedHTML= `
                        <li class="row">
                        <div class="content">
                            <i class="fas fa-file-alt"></i>
                            <div class="details">
                                <span class="name">${n} Uploaded</span>
                                <span class="size">${fileSize} </span>
                            </div>
                        </div>
                        <i class="fas fa-check"></i>
                    </li>
                          `
                          if(loaded==total){
                            progressArea.innerHTML= ""
                            
                              uploadedArea.insertAdjacentHTML("afterbegin",uploadedHTML)
                            }
    })
    let formData= new FormData(form)
    xhr.send(formData)
}
  
}