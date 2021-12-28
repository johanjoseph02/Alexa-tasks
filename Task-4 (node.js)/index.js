const readline = require('readline');
const fs =require('fs');
const { exit } = require('process');
const { table } = require('console');

const stdio = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("------------------------------------------------------------");
console.log("#                                                          #");
console.log("#               Welcome to Address Directory               #");
console.log("#                                                          #");

const prompt = () => {
    console.log("------------------------------------------------------------");
    stdio.question("1 - Add new entry\n2 - Delete an entry\n3 - View all entries\n4 - Delete all entries\n5 - EXIT\n--> ", (option) => { 
        selectOption(option);
    });
}

prompt()

const selectOption = (op) => {
    switch (op)
        {
            case '1':
                addOne();
                break;
            case '2':
                delOne();
                break;
            case '3':
                showAll();
                break;
            case '4':
                delAll();
                break;
            case '5':
                end();
                break;
            default: 
                console.log("\n!! Incorrect selection. Please try again !!\n"); 
                prompt();
        }
}

//append '[' to empty json file
let data=fs.readFileSync('addressdir.json','utf-8');
if(data.length==0){
    fs.appendFile("addressdir.json", "[", (err) => {
        if(err)
        {
            console.log(err)
            return;
        }
    });    
}

//1. function to Add one entry 
const addOne = () => {
    stdio.question("\nEnter Name: ", (title) => {
        stdio.question("Enter Address: ", (address)=>{
            let data = {
                name:title,
                address:address,
            }
            let jsondata = JSON.stringify(data);
            fs.appendFile("addressdir.json", jsondata+",", (err) => {
                if(err)
                {
                    console.log(err)
                    return;
                }
            });
            console.log("\n-- Entry added successfully! --\n");

            prompt();
        });
    });
}

//2. function to Delete one entry
const delOne = () => {
    let jsondata=fs.readFileSync('addressdir.json','utf-8');
    if(jsondata.length==1) {
        console.log("\n!! The directory is empty !!\n");
        prompt();
    }
    else {
        console.log("\nHere is the entire directory:\n");
        jsondata = jsondata.slice(0,-1);
        jsondata = jsondata+"]"
        let jsarr = JSON.parse(jsondata);
        console.table(jsarr)
        console.log("");

        stdio.question("Enter INDEX NUMBER to be deleted\n--> ",(delindex) => {
            let jsondata = fs.readFileSync('addressdir.json','utf-8');
            jsondata = jsondata.slice(0,-1);
            jsondata = jsondata+"]"
            let jsarr = JSON.parse(jsondata);
            jsarr.splice(delindex, 1);
            let jsondata2 = JSON.stringify(jsarr)
            jsondata2 = jsondata2.slice(0,-1);
            jsondata2 = jsondata2+","
            fs.writeFile("addressdir.json", jsondata2, (err) => {
                if(err) 
                { 
                    console.log(err);
                    return;
                };
            });
            console.log("\n-- Entry deleted successfully! --\n")

            prompt();
        });
    }
}

//3. function to Show all entries
const showAll = () => {
    let jsondata=fs.readFileSync('addressdir.json','utf-8');
    if(jsondata.length==1) {
        console.log("\n!! The directory is empty !!");
    }
    else {
        console.log("\nHere is the entire directory:\n");
        jsondata = jsondata.slice(0,-1);
        jsondata = jsondata+"]"
        let jsarr = JSON.parse(jsondata);
        console.table(jsarr)
    }
    console.log("");
    prompt();
}

//4. function to Delete all entries
const delAll = () => {
    fs.writeFileSync('addressdir.json', "[");
    console.log("\n-- ALL entries deleted successfully --\n");
    prompt();
}

//5. function to EXIT program
const end = () => {
    console.log("\nExiting...\nThank you for using Address Directory!\n\n-- Developed by Johan Mathew Joseph :) --\n");
    stdio.close();
    process.exit(0);
}
//========================================================================
//END OF CODE