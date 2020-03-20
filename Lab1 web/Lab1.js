var readlineSync = require('readline-sync');

var Task ={
    Description:"description",
    Urgent:false,
    private:false,
    deadline:Date()
}
main();
var Tasklist=[];

function main(){

 Tasklist= sampleData();
seperator("Excercise one");
string_split();
seperator("menu");
while  (Menu())
     seperator("Return to menu");

}


 function Menu()
 { 

    let isbringMenu=true;
 console.log('1. Insert a new task');
 console.log('2. Remove a task');
 console.log('3. Show all existing tasks, in alphabetic order');
 console.log('4. Close the program');
 
 let choice = readlineSync.question('ُSelect one of the choices [1-4]?');

 switch (choice)
 {
    case "1":
        InsertTask();
    break;
    case "2":
        DeleteTask();
    break;
    case "3":
        showTaskList();
    break;
    case "4":
        console.log('Bye');
        isbringMenu=false;
    break;
 }
 return isbringMenu;
}
function InsertTask(){
    seperator("Insert Task");
let choice = readlineSync.question('ُCan you type a description:');
         let Task2=Object.assign({},Task);
         Task2.Description=choice;
         if(readlineSync.question('ُIs is urgent? [y/n]:') == "y") 
         Task2.Urgent=true;
         if(readlineSync.question('ُIs is private? [y/n]:') == "y") 
         Task2.private=true;
         let datestr=readlineSync.question('ُcan you type the date? [year-mm-dd]:') ;
         try {
           let date= Date.parse(datestr) ;
           Task2.data=date;
           timeoutTask(Task2);
         }
         catch
         {
            console.log("problem in converting date");
         }
         Tasklist.push(Task2);
}

function string_split()
{//====================Ex1====================
str = "spring";
str =str.slice(0, 2)+ str.slice(-2, ); 
console.log(str);
//====================Ex1====================
}

function seperator (Sectionname)
{
    console.log("========================"+Sectionname+"========================");
}
function showTaskList()
{
    let taskListSorted=Tasklist.sort(compare);
    for (task of taskListSorted)
    { 
        console.log("************************************");
    console.log(" Task Description: "+task.Description);
     console.log(" Task is Urgent?: "+task.Urgent);
     console.log(" Task is private?: "+task.private);
     console.log(" Task is date: "+(new Date(task.data)).toUTCString());
     console.log("************************************");
    }
}

function DeleteTask()
{
    let choice = readlineSync.question('ُwith respect to(1-Description , 2-Date 3-Current date and before)you want to delete?[1-3]:');
    if (choice=="1"){
    choice = readlineSync.question('ُType the description of Task to delete:');
    return  Tasklist.splice(Tasklist.findIndex(value=>value.Description==choice),1);
    }
    else if (choice=="2"){
        choice = readlineSync.question('ُType the date of Task to delete [year-mm-dd]:');
        let date= Date.parse(choice) ;
        return  Tasklist.splice(Tasklist.findIndex(value=>value.date==choice),1);
    }
    else if (choice=="3"){
        choice = readlineSync.question('ُType the date of Task to delete history [year-mm-dd]:');
        let date= Date.parse(choice) ;
        for (taskindex of Tasklist.findIndex(value=>value.date<date))
        Tasklist.splice(taskindex,1);
          
    }
}

function sampleData(){
   let tasklistsample=[];
    let Task2=Object.assign({},Task);
    Task2.Description="test";
    Task2.Urgent=true;
    Task2.private=true;
    Task2.date= Date.parse("2020-03-20") ;
    timeoutTask(Task2);
     tasklistsample.push(Task2);

    let Task3=Object.assign({},Task);
    Task3.Description="besttest";
    Task3.Urgent=true;
    Task3.private=true;
    Task3.date= Date.parse("2020-03-21") ;
    timeoutTask(Task3);
     tasklistsample.push(Task3);
    return tasklistsample;
}
function compare( a, b ) {
    if ( a.Description < b.Description ){
      return -1;
    }
    if ( a.Description > b.Description ){
      return 1;
    }
    return 0;
  }

  function timeoutTask(inputTask)
  {
    let d1 = new Date();
    let d2 = new Date(inputTask.date);
    let bigger = d1.getTime() > d2.getTime();
if (bigger)
 setTimeout(()=>{
        Tasklist.splice(Tasklist.findIndex(value=>value==inputTask));
  }, inputTask.date-(new Date()));
}