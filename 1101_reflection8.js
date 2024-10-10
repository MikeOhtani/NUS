function make_withdraw(balance, password) {// balance inside the argument block can also serve as variable declaration statement
    
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
}

const w1 = make_withdraw(100, "my_password"); //this constant declaration will keep the value to make_withdraw.
w1(19, "my_password");
w1(9, "my_psswrd");
w1(90, "my_paswrd");
w1(90, "my_passord");
w1(90, "my_pasrd");
w1(90, "my_pasrd");
