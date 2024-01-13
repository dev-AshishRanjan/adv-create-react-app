#!/usr/bin/env node


const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { exec } = require("child_process");
const chalk = require("chalk");

var ProjectName;

console.log(chalk.bgGreen.black("Initializing Advanced React App"));
// Function to copy template files
function copyTemplateFiles(destinationPath, choice) {
  // source
  // const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);
  // console.log(path.dirname(new URL(import.meta.url).pathname));
  const dir = path.join(__dirname, "template");
  const globalDir = path.join(dir, "global");
  const templateDir = path.join(dir, choice);

  const copyFile = (source, destination) => {
    fs.copyFileSync(source, destination);
    console.log(
      chalk.gray(`File copied successfully from ${source} to ${destination}`),
    );
  };

  // Function to recursively copy files in a directory
  const copyFilesRecursively = (sourceDir, destDir) => {
    const files = fs.readdirSync(sourceDir);

    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      if (file == "LICENSE" || file == "README.md") {
        let content = fs.readFileSync(sourcePath, "utf-8");
        content = content.replace(
          /ProjectName/g,
          ProjectName === "." ? path.basename(process.cwd()) : ProjectName,
        );
        fs.writeFileSync(destPath, content);
      } else if (fs.statSync(sourcePath).isDirectory()) {
        // If it's a directory, create it in the destination path
        fs.mkdirSync(destPath, { recursive: true });
        // Recursively copy files in the subdirectory
        copyFilesRecursively(sourcePath, destPath);
      } else {
        // If it's a file, copy it
        copyFile(sourcePath, destPath);
      }
    });
  };

  // Copy files in the global directory
  copyFilesRecursively(globalDir, destinationPath);

  // Copy files in the template directory
  copyFilesRecursively(templateDir, destinationPath);
}

// Function to handle different outputs based on user choice
function handleUserChoice(choice) {
  // destination
  const userProjectDir = process.cwd();
  const projectDir = path.join(userProjectDir, ProjectName);
  // Create the project directory if it doesn't exist
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
    copyTemplateFiles(projectDir, choice);
  } else if (ProjectName === ".") {
    let parentFolder = path.basename(process.cwd());
    if (!isValidPackageName(parentFolder)) {
      throw new Error(
        `Not a valid Project Name = ${chalk.bgRed.blackBright(parentFolder)} \nFile naming convention : /^[a-z0-9-._]+$/`,
      );
    } else copyTemplateFiles(projectDir, choice);
  } else {
    throw new Error(`'${chalk.bgRed.blackBright(projectDir)}' already exists`);
  }
}

function isValidPackageName(packageName) {
  // Regular expression for npm package name conventions
  const packageNameRegex = /^[a-z0-9-._]+$/;
  // Check if the package name matches the regex
  return packageNameRegex.test(packageName);
}

// Main CLI logic with an MCQ
const TemplateQuestions = [
  {
    type: "input",
    name: "ProjectName",
    message: "Project name:",
    default: "adv-cra",
    // validate: isValidPackageName,
  },
  {
    type: "list",
    name: "userChoice",
    message: "Please select Framework:",
    choices: [
      "React",
      "React + TS",
      "React + Tailwind",
      "React + TS + Tailwind",
    ],
  },
];

inquirer
  .prompt(TemplateQuestions)
  .then((answers) => {
    ProjectName = answers.ProjectName;
    if (!isValidPackageName(ProjectName)) {
      throw new Error(
        `Not a valid Project Name = ${chalk.bgRed.blackBright(ProjectName)} \nFile naming convention : /^[a-z0-9-._]+$/`,
      );
    } else {
      const userChoice = answers.userChoice;
      handleUserChoice(userChoice);
      // console.log({ answers });
      console.log(chalk.blue("\n\nThanks for choosing adv-create-react-app"));
      console.log(
        `${chalk.bold.bgGreen.black("Project created successfully!")}\n${chalk.blue("Now run these commands")} (in terminal) :${chalk.bold.blue(`\n\tcd ${ProjectName} \n\tnpm install \n\tnpm start \n`)}`,
      );
      // some advanced functionalities
      // process.chdir(ProjectName);
      // console.log(`Current working directory: ${process.cwd()}`);
      // exec(`npm i -f`);
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(
        chalk.yellow("Prompt couldn't be rendered in the current environment"),
      );
    } else {
      console.log(chalk.yellow("Something went wrong"));
      console.error(chalk.red.bold(error));
    }
  });
