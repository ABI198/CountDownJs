var detectBtn = document.getElementById('detect');
var startBtn = document.getElementById('start'); 
var stopBtn = document.getElementById('stop'); 
var counterCircle = document.getElementById('counterCircle');
var counterBox = document.getElementById('counterBox');
var warning = document.getElementById('warning');         
var input = document.getElementById('input');  

var currentValue = 0;
var stopValue = 0;
var counter = 1;
var counterDown;
var startBtnCheck = false;
var detectBtnCheck = false;


eventListenersRun();

//Functions
//------------------------------------------------------------------------------------------------------------
function eventListenersRun(){
    detectBtn.addEventListener('click', whenDetectIsClicked);
    startBtn.addEventListener('click', whenStartIsClicked);
    stopBtn.addEventListener('click', whenStopIsClicked);
}
     
function getValueFromInput(){
    if(input.value === '')
        invalidInputWarning();
    else if(isNaN(Number(input.value)))
        invalidInputWarning()
    else if(!checkNumericalValueBiggerThanZero(input.value))
        invalidInputWarning()
    else if(checkNumericalValueBiggerThanZero(input.value)){
        changeHTMLCodeInCounterCircle(input.value);
        detectBtnCheck = true;
        startBtnCheck = true;
        warning.style.display = 'none';
   }
}

function checkNumericalValueBiggerThanZero(inputValue){
    let value = Number(inputValue);
    return value > 0;
}

function invalidInputWarning(){
    alert('Please enter a numerical value bigger than 0');
    clearOldInputValues();
}

function clearOldInputValues(){
    input.value = '';
    counterCircle.innerHTML = '<p>' + '' + '</p>';
}

function changeHTMLCodeInCounterCircle(value){
    counterCircle.innerHTML = '<p>' + value + '</p>';
    counterCircle.style.display = 'block';
    counterBox.style.display = 'none';
}

function changeHTMLCodeInCounterBox(value){
    counterBox.innerHTML = '<p>' + value + '</p>';
    counterBox.style.display = 'block';
    counterCircle.style.display = 'none';
}

function counterDownRun(){
    currentValue = determineCurrentValue();
    if(startBtnCheck){
        counterDown = setInterval(function(){
            if(currentValue == input.value)
                changeHTMLCodeInCounterCircle(currentValue); 
            else
            {
                //Algorithm for Colored Shapes Changing (Box => Even & Circle => Odd)
                if(counter % 2 == 0) 
                    changeHTMLCodeInCounterBox(currentValue);
                else
                    changeHTMLCodeInCounterCircle(currentValue);
            }
            startBtnCheck = false;
            ++counter;
            --currentValue;
            checkCurrentValueIsZeroOrNot();
        }, 1000);
    }
    else if(detectBtnCheck && !startBtnCheck){ //What if we click on Start button when it is already active
        stopCounterDown();
        alert('Start Button is already active! We stopped it to prevent a runtime error. If you prefer you can active it again by clicking (Start) button');
    }
    else if(!detectBtnCheck && !startBtnCheck) //What if we don't detect a value but we click start though
        alert('Please detect an appropriate value first')
}

function checkCurrentValueIsZeroOrNot(){
    if(currentValue <= -1){ //If we want to see '1' value on animation we should compare -1 instead of 0!!
        counterBox.style.display = 'none';
        counterCircle.style.display = 'none';
        warning.style.display = 'block';
        refreshAllSettings();
    }
}

function determineCurrentValue(){
    if(stopValue === 0)
        return input.value;   
    else
        return currentValue;
}


function stopCounterDown(){
    clearInterval(counterDown);
    stopValue = currentValue;
    startBtnCheck = true;
}

function refreshAllSettings(){
    clearInterval(counterDown);
    currentValue = 0;
    stopValue = 0;
    counter = 1;
}

//Event Handlers
//------------------------------------------------------------------------------------------------------------
function whenDetectIsClicked(){
    getValueFromInput();
    refreshAllSettings();
}

function whenStartIsClicked(){
    counterDownRun();
}

function whenStopIsClicked(){
    stopCounterDown();
}