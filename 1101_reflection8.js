/* Q1 b) */

// function make_withdraw(balance, password) {// balance inside the argument block can also serve as variable declaration statement
const make_withdraw = (balance, password) => {
    let tracker = 1;
    
    function withdraw (amount, check_password) {
        if(balance > amount && check_password === password && tracker < 3) {
            balance = balance - amount;
            return balance;
            
        } else if (check_password !== password && tracker < 3) {
            tracker = tracker + 1;
            return "Wrong password, no withdrawl";
            
        } else if (tracker >= 3) {
            return "Account disabled";
            
        } else {
            return "insufficient funds";
        }
    }
    
    return withdraw;
};

const w1 = make_withdraw(100, "my_password"); //this constant declaration will keep the value to make_withdraw.
w1(19, "my_password");
w1(9, "my_psswrd");
w1(90, "my_paswrd");
w1(90, "my_passord");
w1(90, "my_pasrd");
w1(90, "my_pasrd");

//unit3 important: extending the funciton environment with the binding of the variable to the function




// (i) protected account process must set at first like the error check of tracker.

// (ii) if condition can include if and else condition inclusively.()

// (iii) account reset can be achieved if password is correct and set tracker = 0 at the password correct condition. 




// function make_withdraw(balance) {//program itself

//     function withdraw(amount) {
//         if (password === pwd) {
//             if (balance >= amount) {
//             balance = balance - amount;
//             return balance;
//           }else {
//             return "Insufficient funds";
//         }
//     }// function withdraw is the block of program make_withdraw. 
//     return withdraw;
// }

// const W1 = make_withdraw(100);// program environmment 
// W1(40);// apply function w1 and extend the environment of W1 with binding of new variable.
// W1(40);
// W1(40);