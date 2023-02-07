
const p = document.querySelector('.typing');
const menuBtn = document.getElementById('menuBtn');
const greeting = document.querySelector('.greeting');
const loader = document.querySelector('.loader');
const petBlock = document.querySelector('.pet');
const menu = document.querySelector('.menu');
const replicas = document.querySelector('.fox-replicas');
const pet = document.getElementById('pet-img');
const replic = document.getElementById('replic');


const apps = [...document.getElementsByClassName("app")];
const options = document.getElementsByClassName("options");
const actives = document.getElementsByClassName('active');
for(let i = 0; options.length > i; i++) {
  options[i].onclick = function() {
    let currentActive = actives[0];
    if (currentActive)
      currentActive.classList.remove("active");

    if (currentActive !== this) {
      apps[i].classList.add("active");
    }
  };
}


document.getElementById('lyrics-close').onclick = function(){
  document.querySelector('.lyrics-app').classList.remove('active');
}


document.getElementById('book-close').onclick = function(){
  document.querySelector('.book-app').classList.remove('active');
}






let i = 0;
const sentence = [
          'Привет. Спасибо, что заглянули.',
          'Здесь я покажу свои pet-проекты',
          'От меньших к более крупным.',
          'Приятного исследования. И...', 
          'Не забудьте погладить лисёнка :)'
          ];


function printSen() {
      i = i % 6;
      if(i === 4) {
        p.style.width = `${sentence[i].length}ch`;
        p.innerHTML = sentence[i++];
        menuBtn.innerHTML = 'Начать';
        menuBtn.onclick = function(){closeStart()}
        return
      };
      p.style.width = `${sentence[i].length}ch`;
      p.innerHTML = sentence[i++];
}

function closeStart(){
  greeting.style.display="none";
  petBlock.style.visibility="visible";
  menu.style.display="flex";
}

menuBtn.addEventListener("click", function() {
  p.classList.add('activeSen');
  printSen();
});


p.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler () {

  p.classList.remove('activeSen');
}





petBlock.addEventListener("animationiteration", function(e){
  let right = petBlock.getBoundingClientRect();

  if( right.x >= 235){
    pet.style.transform = "scaleX(-1)";
  }
  if( right.x <=230){
    pet.style.transform ="scaleX(1)";
  }
})


// const leafReplics = ["Я принёс лист. Возьми.","Ещё один. Я люблю листья.","Последний лист на этой странице."]
// let leafCount = 0;
// const findInterval = setInterval(petFindItem,60000);


// function petFindItem(){
//   if(leafCount >= 2) {
//     clearInterval(findInterval);
//   };
//   replic.innerHTML =  `${leafReplics[leafCount]}`;
//   petBlock.classList.add('paused');
//   pet.src="./public/foxGive.gif";

//   pet.onclick = () => {
//     replic.innerHTML = "";
//     petBlock.classList.remove('paused');
//     pet.src="./public/foxLie.gif";
//     leafCount +=1;
//   }

// }


petBlock.onclick = () => {
  replic.innerHTML = "Я люблю тебя, летающая мышка <br> ❤";
  setTimeout(()=>{
    replic.innerHTML = "";
  },4000)
}
