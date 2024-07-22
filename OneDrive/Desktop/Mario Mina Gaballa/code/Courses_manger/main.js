import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { table } from "console";
const program = new Command();

const questions = [
  {
    type: "input",
    name: "programming",
    message: "Please Enter Course Title ",
  },
  {
    type: "number",
    name: "price",
    message: "Please Enter Course Price ",
  },
];
const FilePath = "./courses.json";

program
  .name("Courses_manger")
  .description("CLI to make courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("add a course")
  .action((param, options) => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync(FilePath)) {
        fs.readFile(FilePath, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            process.exit();
          } else {
            console.log(`file contant =>> ${data}`);
            const FileContentAsJson = JSON.parse(data);
            FileContentAsJson.push(answers);
            fs.writeFile(
              "./courses.json",
              JSON.stringify(FileContentAsJson),
              "utf-8",
              (err, data) => {
                if (err) {
                  console.log("Error >> ");
                } else {
                  console.log("Done");
                }
              }
            );
          }
        });
      } else {
        fs.writeFile(
          "./courses.json",
          JSON.stringify([answers]),
          "utf-8",
          (err, data) => {
            if (err) {
              console.log("Error >> ");
            } else {
              console.log("Done");
            }
          }
        );
      }
      //create file
    });
  });
program
  .command("list")
  .alias("l")
  .description("list all course")
  .action(() => {
    fs.readFile(FilePath,'utf-8',(err,data)=>{
      if(err){
        console.log("Error =>",err);
        process.exit();
      }else{
      console.table(JSON.parse(data))
      
      }
    })
  });

program.parse();
