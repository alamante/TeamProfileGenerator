const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = [];
const teamMembers = [];

const appMenu = () => {
  function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
         fs.mkdirSync(OUTPUT_DIR)
    }
   fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
  }

function addIntern(){
    inquirer.prompt([
        {
        type:"input",
        name: "internName",
        message: "What is your Intern's name"
        
    },

    {
        type:"input",
        name: "internId",
        message: "What is your Intern's Id"
        
    },

    {
        type:"input",
        name: "internEmail",
        message: "What is your Intern's Email"
        
    },
    {
        type:"input",
        name: "internSchool",
        message: "What is your Intern's School"
        
    }

    ]).then(answers =>{
        const intern = new Intern(answers.internName, 
            answers.internId, answers.internEmail, answers.internSchool)
        console.log(intern)
        teamMembers.push(intern);
        idList.push(answers.internId);
        createTeam();
    })

}

function addEngineer(){
    inquirer.prompt([
        {
        type:"input",
        name: "engineerName",
        message: "What is your Engineer's name"
        
    },

    {
        type:"input",
        name: "engineerId",
        message: "What is your Engineer's Id"
        
    },

    {
        type:"input",
        name: "engineerEmail",
        message: "What is your Engineer's Email"
        
    },
    {
        type:"input",
        name: "engineerGithub",
        message: "What is your Engineer's Github"
        
    }

    ]).then(answers =>{
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        console.log(engineer)
        teamMembers.push(engineer);
        idList.push(answers.engineerId);
        createTeam();
    })

}


   function createTeam(){
    inquirer.prompt([
        {
        type:"list",
        name: "memberChoice",
        message: "What type of team member would you like to add",
        choices: ["Engineer", "intern", "I dont want to add any more team members"]
        
    },

    ]).then(userChoice => {
        if(userChoice.memberChoice === "Engineer"){
            // Add Engineer Function
             addEngineer();
        }else if(userChoice.memberChoice === "intern" ){
            // Add Intern Function
            addIntern();
        }else{
            // Build Team Function
            buildTeam()
        }
    })

   }




    function createManager(){
        console.log("Please build your team");
        inquirer.prompt([
            {
            type:" input",
            name: "managerName",
            message: "What is the team Manager's name",
            validate: (answer) =>{
                if(answer !== ""){
                    return true
                }
                return "Please enter aleast one character"
            }
        },

        {
            type:"input",
            name: "managerEmail",
            message: "What is the team Manager's email",

        },

        {
            type:" input",
            name: "managerId",
            message: "What is the team Manager's id",

        },

        {
            type:" input",
            name: "managerOfficeNumber",
            message: "What is the team Manager's Office number",

        }


        ]).then(answers =>{
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager)
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    createManager();

}

appMenu()
