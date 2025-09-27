
console.log("Welcome to So GOOD Hotel Booking App");
console.log("Booking Reminder:\nBook 3days before the end month is not allowed.\nThank you for understanding! ");

const userAccount = [];
const roomInfoRates = [{Room_name:"Single Room",capacity:"1-2 Persons",per_hour:50,Promo_12hrs:500,Promo_24hrs:1100},
                       {Room_name:"Double Room",capacity:"2-3 Persons",per_hour:70,Promo_12hrs:740,Promo_24hrs:1550},
                       {Room_name:"2x Double Room",capacity:"3-4 Persons",per_hour:90,Promo_12hrs:950,Promo_24hrs:2000},
                       {Room_name:"Family Room",capacity:"4-6 Persons",per_hour:100,Promo_12hrs:1100,Promo_24hrs:2200}];

function HomePage(){
   let bookedRoomDetail = [{UserID:"",RoomName:"",Hours: 0,Promo: 0,Checkin_Month: 0,Checkin_Day: 0,Checkin_Time: 0}]; // container of bookedRoomDetails info
   let bookHistory = []; // container of users booked history
                        // was about to add unpaid kaso di ko pa ma figureout paano for e.g pending payment

   const navBar = prompt("Home Page:\nType: 'Signin' to LoginForm \nType: 'Signup' to SignupForm\nType: 'Guest' to View Hotel Rooms");
      if(navBar === "Signup" || navBar === "signup"){ 
      createAccnt(); // Type Signup or signup to enter SignupForm
      }
         else if(navBar === "Signin" || navBar === "signin"){ // Type Signin or signin to enter LoginForm
            console.log("You're in Signin Form");
            let loginAccounts = userAccount;
            do{
            loginAccounts = prompt("Login:\nEnter Your Username");
         if(loginAccounts === null){
            console.log("Login Cancelled!\nreturn to Home Page");
            HomePage();
            break;
         }
         else if(!userAccount.includes(loginAccounts)){
            alert("Login Account Not Found\nGo to Signup if you don't have account!");
            console.log("return to Home:");
            HomePage();
            break;
         }
         else if(userAccount.includes(loginAccounts)){
            const foundUser = userAccount.find(userAccount => userAccount === loginAccounts); // user Finder
            if(foundUser){
                     console.log(`Hello ${loginAccounts} ! Here are our rooms you can book`);
                     bookingFunction();
                     break;
            }
         }
         }while(loginAccounts===null || loginAccounts.trim()===""){
            }

            function bookingFunction(){
               console.log("\nRoom Informations");
               for(const value of Object.values(roomInfoRates)){ //display array of object in readable line
                  console.log(value); 
               }
               select_a_room();

            function select_a_room(){
                  console.log("\nSelect Room Name");
                  bookedRoomDetail[0].UserID = loginAccounts ; // send this var logged account to  var that represents  bookinfo

                  console.log(`List of Rooms :\n${roomInfoRates[0].Room_name}\n${roomInfoRates[1].Room_name}\n${roomInfoRates[2].Room_name}\n${roomInfoRates[3].Room_name}`);
                  bookedRoomDetail[0].RoomName = prompt("Enter the Room Name to Select:");
               if(bookedRoomDetail[0].RoomName === "Single Room" ||
                  bookedRoomDetail[0].RoomName === "Double Room" ||
                  bookedRoomDetail[0].RoomName === "2x Double Room" ||
                  bookedRoomDetail[0].RoomName === "Family Room")
               {
                  perHrorPromo();
               }
                  else if(bookedRoomDetail[0].RoomName === null){
                     alert("Cannot cancel!");
                     bookingFunction();
                  }
                  else{
                     alert("Invalid Room Name");
                     select_a_room();
               }
            }

            function perHrorPromo(){
               console.log("Select if the Room you want to Book is Promo or perHour");
               const confirmhoursORpromos = confirm("Select PerHour Or Promo\nClick 'OK' if per Hours\nClick 'Cancel' if Room Promos");
               if(confirmhoursORpromos){
                  selectHours();
               }
               else{
                  selectPromo();
               }
            }

            function selectHours(){
               console.log("perHour is Selected!");
               console.log("Enter Room Duration:");
               bookedRoomDetail[0].Hours = prompt("Enter How many Hours");
               
               if(bookedRoomDetail[0].Hours >=12){
                  alert("Max perHour is less than 12");
                  console.log("\nROOM BOOKING INFO");
                  selectHours();
               }
               else if(bookedRoomDetail[0].Hours === null){
                  alert("cancelled");
                  perHrorPromo();
               }
               else if(bookedRoomDetail[0].Hours.trim()===""){
                  alert("Do not leave Empty");
                  selectHours();
               }
               else{
                  bookedRoomDetail[0].Hours = Number(bookedRoomDetail[0].Hours);
                  selectMonth();
               }
            }

            function selectPromo(){
               console.log("Promos is Selected");
               console.log("Select Promo:\nWe Only have 12hrs and 24hrs.\nAfter the Promo ends,the exceeding Hours will accomulate as per Hour !");
               
               bookedRoomDetail[0].Promo = prompt("Enter Selected Promo Code\nInput 12 or 24");
                  bookedRoomDetail[0].Promo = Number(bookedRoomDetail[0].Promo);
                  if(bookedRoomDetail[0].Promo === 12 || bookedRoomDetail[0].Promo === 24){
                     selectMonth();
                  }
                  else{
                     alert("cant find Promo Code:");
                     selectPromo();
                  }
               }

            function selectMonth(){
               console.log("Select Month Jan - Dec\nUse number 1-12");
               bookedRoomDetail[0].Checkin_Month = prompt("Enter Check-in Month using Number");
               bookedRoomDetail[0].Checkin_Month = Number(bookedRoomDetail[0].Checkin_Month); // convert to number
                  const currentDate = new Date(); //get specific date today
                  const getcurrentMonth = currentDate.getMonth() +1 ;
                  const currentMonthday = currentDate.getDate();

                  if(bookedRoomDetail[0].Checkin_Month < getcurrentMonth){
                     alert("Cannot Select Previous Month!");
                     selectMonth();
                  }
                  else if(bookedRoomDetail[0].Checkin_Month > 12){
                     alert("Month not Found");
                     selectMonth();
                  }
                  else if (bookedRoomDetail[0].Checkin_Month === getcurrentMonth){
                     if(currentMonthday === 28 ||  currentMonthday === 29 || currentMonthday === 30 || currentMonthday === 31){ 
                        alert("it's almost end of the month,\n3days before end of the month is not allowed if Online Booking.");
                        selectMonth();
                     }
                     else{
                        alert("Check your Calendar before selecting Day!");
                        selectDay();
                     }
                  }
                  else{
                        alert("Check your Calendar before selecting Day!");
                        selectDay();
                     }

               function selectDay(){
                  console.log("Select Day 1-31");
                  bookedRoomDetail[0].Checkin_Day = prompt("Enter Check-in Day");
                  bookedRoomDetail[0].Checkin_Day = Number(bookedRoomDetail[0].Checkin_Day);
                     const currentDay = currentDate.getDate();
                     const plus3Days = currentDate.getDate() + 3; 

                     if(bookedRoomDetail[0].Checkin_Day > 31){
                        alert("there is Only 1-31 days in a Month");
                        selectDay();
                     }
                     else if(bookedRoomDetail[0].Checkin_Month === getcurrentMonth){
                        if(bookedRoomDetail[0].Checkin_Day < currentDay){   /////                                             HERE CONTINUE
                           alert("cant Enter Previous Days");
                           selectDay();
                        }
                        else if(bookedRoomDetail[0].Checkin_Day < plus3Days){
                           alert("Booking a Room must be atleast 3-Days Before Check-in Day!");
                           selectDay();
                        }
                        else{
                        selectTime();
                        }
                     }
                     else if(bookedRoomDetail[0].Checkin_Day === 0 || null){
                           alert("Cannot Cancel!");
                           selectDay();
                        }
                     else{
                        selectTime();
                     }
               }

               function selectTime(){
                  alert("selecting button OK or Cancel will auto set time to ' 0 '");
                  console.log("Select Time");
                  bookedRoomDetail[0].Checkin_Time = prompt("Enter Check-in Time 0-24");
                  bookedRoomDetail[0].Checkin_Time = Number(bookedRoomDetail[0].Checkin_Time);

                  if(bookedRoomDetail[0].Checkin_Time > 24 || bookedRoomDetail[0].Checkin_Time < 0){
                     alert("Invalid Check-in Time");
                     selectTime();
                  }
                  else{
                     modifyBookprompt();
                  }
               }
            }

            function modifyBookprompt(){
                     
               console.log("here is the Summary of the room you booked!");
                     for(const value of Object.values(bookedRoomDetail)){
                           console.log("Booking Details:");
                           console.log(value);
                        }
                        debugger;
               const confirmedEdit = confirm("Would you like to Modify your Booked Room?");
                  if(confirmedEdit){
                     bookedRoomDetail[0].UserID = loginAccounts ;
                     bookedRoomDetail = [{UserID:"",RoomName:"",Hours: 0,Promo: 0,Checkin_Month: 0,Checkin_Day: 0,Checkin_Time: 0}];
                     select_a_room()
                  }
                  else{
                     bookingInfoandCost();
               }
         }

         function bookingInfoandCost(){
            console.log('Booking Info. & Total Cost`');

            switch(bookedRoomDetail[0].RoomName){ //  switch method

               case "Single Room":
                  
                  const singleRoomHRs = `Cost of ${bookedRoomDetail[0].Hours} Hours: ₱` + (bookedRoomDetail[0].Hours * roomInfoRates[0].per_hour);
                     console.log(`Room Name : ${bookedRoomDetail[0].RoomName}`);
                     console.log(`Room Capacity: ${roomInfoRates[0].capacity}`);
                     console.log(`Check in Date&Time: Month:${bookedRoomDetail[0].Checkin_Month} Day:${bookedRoomDetail[0].Checkin_Day} Time:${bookedRoomDetail[0].Checkin_Time}`);
                     console.log(singleRoomHRs);
                     const singleRoomhistory = {User_ID: bookedRoomDetail[0].UserID,
                                                Room_Name: bookedRoomDetail[0].RoomName,
                                                Room_Capacity: roomInfoRates[0].capacity,
                                                CheckInMonth: bookedRoomDetail[0].Checkin_Month,
                                                CheckInDay: bookedRoomDetail[0].Checkin_Day,
                                                CheckkinTime: bookedRoomDetail[0].Checkin_Time,
                                                Book_Hrs:bookedRoomDetail[0].Hours,
                                                Book_Hours_rate: roomInfoRates[0].per_hour,
                                                HourlyCost: bookedRoomDetail[0].Hours * roomInfoRates[0].per_hour};
                     bookHistory.push(singleRoomhistory);

                     if(bookedRoomDetail[0].Promo === 12){
                        bookedRoomDetail[0].Promo = Number(bookedRoomDetail[0].Promo);
                        console.log(`Promo Code: 12hrs \nPromo Cost :${roomInfoRates[0].Promo_12hrs}`);
                        const singlepromo12Hrs = "Promo12";
                        singleRoomhistory[singlepromo12Hrs] = roomInfoRates[0].Promo_12hrs;
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        console.log(`Promo Code: 24hrs \nPromo Cost: ${roomInfoRates[0].Promo_24hrs}`);
                        const signlepromo24Hrs = "Promo24";
                        singleRoomhistory[signlepromo24Hrs] = roomInfoRates[0].Promo_24hrs;
                     }
                      
                     proceedPayment();                                       // pause !
               break;

               case "Double Room":

                     const doubleRoomHrs = `Cost of ${bookedRoomDetail[0].Hours} Hours: ₱` + (bookedRoomDetail[0].Hours * roomInfoRates[1].per_hour);
                     console.log(`Room Name : ${bookedRoomDetail[0].RoomName}`);
                     console.log(`Room Capacity: ${roomInfoRates[1].capacity}`);
                     console.log(`Check in Date&Time: Month:${bookedRoomDetail[0].Checkin_Month} Day:${bookedRoomDetail[0].Checkin_Day} Time:${bookedRoomDetail[0].Checkin_Time}`);
                     console.log(doubleRoomHrs);
                     const doubleRoomhistory = {User_ID: bookedRoomDetail[0].UserID,
                                                Room_Name: bookedRoomDetail[0].RoomName,
                                                Room_Capacity: roomInfoRates[1].capacity,
                                                CheckInMonth: bookedRoomDetail[0].Checkin_Month,
                                                CheckInDay: bookedRoomDetail[0].Checkin_Day,
                                                CheckkinTime: bookedRoomDetail[0].Checkin_Time,
                                                Book_Hrs:bookedRoomDetail[0].Hours,
                                                Book_Hours_rate: roomInfoRates[1].per_hour,
                                                HourlyCost: bookedRoomDetail[0].Hours * roomInfoRates[1].per_hour};
                     bookHistory.push(doubleRoomhistory);

                     if(bookedRoomDetail[0].Promo === 12){
                        console.log(`Promo Code: 12hrs \nPromo Cost :${roomInfoRates[1].Promo_12hrs}`);
                        const doublepromo12Hrs = "Promo12";
                        doubleRoomhistory[doublepromo12Hrs] = roomInfoRates[1].Promo_12hrs;
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        console.log(`Promo Code: 24hrs \nPromo Cost: ${roomInfoRates[1].Promo_24hrs}`);
                        const doublepromo24Hrs = "Promo24";
                        doubleRoomhistory[doublepromo24Hrs] = roomInfoRates[1].Promo_24hrs;
                     }
                      
                                                                // pause
                     proceedPayment();
               break;

               case "2x Double Room":

                  const double2xRoomHrs = `Cost of ${bookedRoomDetail[0].Hours} Hours: ₱` + (bookedRoomDetail[0].Hours * roomInfoRates[2].per_hour);
                     console.log(`Room Name : ${bookedRoomDetail[0].RoomName}`);
                     console.log(`Room Capacity: ${roomInfoRates[2].capacity}`);
                     console.log(`Check in Date&Time: Month:${bookedRoomDetail[0].Checkin_Month} Day:${bookedRoomDetail[0].Checkin_Day} Time:${bookedRoomDetail[0].Checkin_Time}`);
                     console.log(double2xRoomHrs);
                     const double2xRoomhistory = {User_ID: bookedRoomDetail[0].UserID,
                                                Room_Name: bookedRoomDetail[0].RoomName,
                                                Room_Capacity: roomInfoRates[2].capacity,
                                                CheckInMonth: bookedRoomDetail[0].Checkin_Month,
                                                CheckInDay: bookedRoomDetail[0].Checkin_Day,
                                                CheckkinTime: bookedRoomDetail[0].Checkin_Time,
                                                Book_Hrs:bookedRoomDetail[0].Hours,
                                                Book_Hours_rate: roomInfoRates[2].per_hour,
                                                HourlyCost: bookedRoomDetail[0].Hours * roomInfoRates[2].per_hour};
                     bookHistory.push(double2xRoomhistory);

                     if(bookedRoomDetail[0].Promo === 12){
                        console.log(`Promo Code: 12hrs \nPromo Cost :${roomInfoRates[2].Promo_12hrs}`); 
                        const double2xpromo12Hrs = "Promo12";
                        double2xRoomhistory[double2xpromo12Hrs] = roomInfoRates[2].Promo_12hrs;
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        console.log(`Promo Code: 24hrs \nPromo Cost: ${roomInfoRates[2].Promo_24hrs}`);
                        const double2xpromo24Hrs = "Promo24";
                        double2xRoomhistory[double2xpromo24Hrs] = roomInfoRates[2].Promo_24hrs;
                     }
                      
                                                        //pause
                     proceedPayment();
               break;        

               case "Family Room":

                  const familyRoomHrs = `Cost of ${bookedRoomDetail[0].Hours} Hours: ₱` + (bookedRoomDetail[0].Hours * roomInfoRates[3].per_hour);
                     console.log(`Room Name : ${bookedRoomDetail[0].RoomName}`);
                     console.log(`Room Capacity: ${roomInfoRates[3].capacity}`);
                     console.log(`Check in Date&Time: Month:${bookedRoomDetail[0].Checkin_Month} Day:${bookedRoomDetail[0].Checkin_Day} Time:${bookedRoomDetail[0].Checkin_Time}`);
                     console.log(familyRoomHrs);
                     const familyRoomhistory = {User_ID: bookedRoomDetail[0].UserID,
                                                Room_Name: bookedRoomDetail[0].RoomName,
                                                Room_Capacity: roomInfoRates[3].capacity,
                                                CheckInMonth: bookedRoomDetail[0].Checkin_Month,
                                                CheckInDay: bookedRoomDetail[0].Checkin_Day,
                                                CheckkinTime: bookedRoomDetail[0].Checkin_Time,
                                                Book_Hrs:bookedRoomDetail[0].Hours,
                                                Book_Hours_rate: roomInfoRates[3].per_hour,
                                                HourlyCost: bookedRoomDetail[0].Hours * roomInfoRates[3].per_hour};
                     bookHistory.push(familyRoomhistory);

                     if(bookedRoomDetail[0].Promo === 12){
                        console.log(`Promo Code: 12hrs \nPromo Cost :${roomInfoRates[3].Promo_12hrs}`); 
                        const familypromo12Hrs = "Promo12";
                        familyRoomhistory[familypromo12Hrs] = roomInfoRates[3].Promo_12hrs;
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        console.log(`Promo Code: 24hrs \nPromo Cost: ${roomInfoRates[3].Promo_24hrs}`);
                        const familypromo24Hrs = "Promo24";
                        familyRoomhistory[familypromo24Hrs] = roomInfoRates[3].Promo_24hrs;
                     }
                                                                                         //pause
                     proceedPayment();
               break; 

               function proceedPayment(){
               const proceedpay = confirm("Would you like to Proceed to Payment ?\nSelect 'Cancel' to delete\nYou will also Logout");  
              if(proceedpay){
                  payNow();
              }
              else{
                  bookHistory.pop();
                  console.log(`Book History Deleted Return Logged out\nReturn to Home :${bookHistory}`);

                  bookedRoomDetail = [{UserID:"",RoomName:"",Hours: 0,Promo: 0,Checkin_Month: 0,Checkin_Day: 0,Checkin_Time: 0}];
                  HomePage();
              }
          }
            function payNow(){
           
               let yourPayment = prompt("Enter Amount to Pay");
                  yourPayment = Number(yourPayment);
                  const Paid = "PAID"

                  if(bookedRoomDetail[0].RoomName === "Single Room"){
                     if(bookedRoomDetail[0].Hours){
                        if(yourPayment < (bookedRoomDetail[0].Hours * roomInfoRates[0].per_hour) || yourPayment > (bookedRoomDetail[0].Hours * roomInfoRates[0].per_hour)){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           singleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 12){
                        if(yourPayment < roomInfoRates[0].Promo_12hrs || yourPayment > roomInfoRates[0].Promo_12hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           singleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        if(yourPayment < roomInfoRates[0].Promo_24hrs || yourPayment > roomInfoRates[0].Promo_24hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           singleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                  }

                  else if(bookedRoomDetail[0].RoomName === "Double Room"){
                     if(bookedRoomDetail[0].Hours){
                        if(yourPayment < (bookedRoomDetail[0].Hours * roomInfoRates[1].per_hour) || yourPayment > (bookedRoomDetail[0].Hours * roomInfoRates[1].per_hour)){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           doubleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 12){
                        if(yourPayment < roomInfoRates[1].Promo_12hrs || yourPayment > roomInfoRates[1].Promo_12hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           doubleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        if(yourPayment < roomInfoRates[1].Promo_24hrs || yourPayment > roomInfoRates[1].Promo_24hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           doubleRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                  }

                  else if(bookedRoomDetail[0].RoomName === "2x Double Room"){
                     if(bookedRoomDetail[0].Hours){
                        if(yourPayment < (bookedRoomDetail[0].Hours * roomInfoRates[2].per_hour) || yourPayment > (bookedRoomDetail[0].Hours * roomInfoRates[2].per_hour)){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           double2xRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 12){
                        if(yourPayment < roomInfoRates[2].Promo_12hrs || yourPayment > roomInfoRates[2].Promo_12hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           double2xRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        if(yourPayment < roomInfoRates[2].Promo_24hrs || yourPayment > roomInfoRates[2].Promo_24hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           double2xRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                  }

                  else if(bookedRoomDetail[0].RoomName === "Family Room"){
                     if(bookedRoomDetail[0].Hours){
                        if(yourPayment < (bookedRoomDetail[0].Hours * roomInfoRates[3].per_hour) || yourPayment > (bookedRoomDetail[0].Hours * roomInfoRates[3].per_hour)){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           familyRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 12){
                        if(yourPayment < roomInfoRates[3].Promo_12hrs || yourPayment > roomInfoRates[3].Promo_12hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           familyRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                           }
                        }
                     }
                     else if(bookedRoomDetail[0].Promo === 24){
                        if(yourPayment < roomInfoRates[3].Promo_24hrs || yourPayment > roomInfoRates[3].Promo_24hrs){
                           alert("Please Enter Exact amount!");
                           payNow();
                        }
                        else{
                           familyRoomhistory[Paid] = "YES";
                           for(const value of Object.values(bookHistory)){
                              console.log("Your Booking Info & Receipt !");
                              console.log("Thank Your for Booking\nPlease Present Receipt in Lobby");
                              console.log(value);
                              
                           }
                        }
                     }
                  }

                  /*


                 /// these comment codes represents if you enter more than the cost will have a Change 


                  if(singleRoomhistory.HourlyCost){
                     const yourChange = yourPayment - singleRoomhistory.HourlyCost ;

                     if(yourPayment < singleRoomhistory.HourlyCost){
                        console.log("Amount you Enter is Less than the Amount to Pay");
                        payNow();
                     }
                     else if(yourPayment > singleRoomhistory.HourlyCost){
                        console.log(`You Have Change ${yourChange}\n Present your Receipt Or SS of this on Lobby:`);
                        singleRoomhistory[Paid] = "YES";
                        singleRoomhistory[haveChange] = yourChange ;
                        console.log("Here is Your Receipt:");
                        for(const value of Object.values(bookHistory)){
                           console.log("Book History:");
                           console.log(value);
                        }
                        console.log("Thanks For Booking to Us !");
                     }
                     else{ // if exact amount
                        console.log("Thanks For Booking to Us !");
                        singleRoomhistory[Paid] = "YES";
                        console.log("Here is Your Receipt:")
                        for(const value of Object.values(bookHistory)){
                           console.log("Book History:");
                           console.log(value);
                        }
                     }
                  }
                  
               else if(roomInfoRates[0].Promo_12hrs){
                     alert("SingleRoom 12hrs");
                  }
               else if(roomInfoRates[0].Promo_12hrs){
                     alert("Single 24Hrs");
                  }
                     */
               }
            }
         }
      }
   }


      else if(navBar === "Guest" || navBar ==="guest"){ // // Type Guest or guest to view Rooms
         console.log("\nHello Guest:");
         viewersFunction();
         setTimeout(HomePage , 5000);
      }
      else if(navBar === null){ // of Click Cancel
         console.log("Thanks for Visiting our App");
      }
      else{
         alert("you Entered a Wrong keyword");
         HomePage();
      }
      
      function createAccnt(){ // Click OK to Create Account
      console.log("You're in Signup Form");
      let newAccount ;
      do{
         newAccount = prompt("Create Account:\nEnter a Username to create account");
            if(userAccount.includes(newAccount)){
               alert("the Username you Enter is taken");
               createAccnt();
               break;
            }
            else if(newAccount === null){
               console.log("New Account Creation cancelled\nreturn to Home Page");
               HomePage();
               break;
            }
            else if(newAccount.trim()===""){
               alert("Empty Fields!\nReturn to Create new Account");
               createAccnt();
               break;
            }
            else{
               userAccount.push(newAccount); // the string you enter in newAccount.prompt = be add to userAccount
               console.log(`\nHello ${newAccount} ! Registration Successful!\nGo to Signin !`);
               HomePage();
               break;
            }
            
         }while(newAccount === null ||newAccount.trim()===""){
         }
      } 
}
setTimeout(HomePage, 3000);


function viewersFunction(){
      console.log("Room Information & Rates");

      for(const value of Object.values(roomInfoRates)){
      console.log(value);
   }
}






