function showHelp(){
    console.log("JUSTIJN'S MENU \n \n How to use: \n --help\t show this help file\n --name {NAME} \tsay welcome to {NAME}");
}

if (process.argv[2] == "--help" || !process.argv[2]) {
    showHelp();
    process.exit();
}

if(process.argv[2] == "--name"){
    console.log("Welkom", process.argv[3]);
    process.exit;
}
